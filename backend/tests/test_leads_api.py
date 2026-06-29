"""Backend API tests for Advalora Consulting landing page.

Covers:
- GET /api/ (health/root)
- POST /api/leads (lead capture with validation)
- GET /api/leads (list leads, sorted desc by created_at)
"""
import os
import re
import uuid
import time
import pytest
import requests

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://cio-licensing-guide.preview.emergentagent.com').rstrip('/')
API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def session():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ---------- Root ----------
class TestRoot:
    def test_root_message(self, session):
        r = session.get(f"{API}/")
        assert r.status_code == 200
        data = r.json()
        assert "message" in data
        assert "Advalora" in data["message"]


# ---------- POST /api/leads ----------
class TestCreateLead:
    def test_create_lead_success(self, session):
        unique = uuid.uuid4().hex[:8]
        payload = {
            "name": f"TEST_User_{unique}",
            "role": "CIO",
            "company": "TEST_Acme Corp",
            "email": f"test_{unique}@example.com",
            "phone": "+91 9999999999",
            "challenge": "We received an Oracle LMS audit notice last week.",
        }
        r = session.post(f"{API}/leads", json=payload)
        assert r.status_code == 201, r.text
        body = r.json()

        # UUID id
        assert "id" in body
        assert isinstance(body["id"], str)
        try:
            uuid.UUID(body["id"])
        except Exception:
            pytest.fail(f"id is not a valid UUID: {body['id']}")

        # ISO timestamp
        assert "created_at" in body
        # FastAPI serializes datetime to ISO 8601
        assert re.match(r"^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}", body["created_at"])

        # Echo fields
        assert body["name"] == payload["name"]
        assert body["company"] == payload["company"]
        assert body["email"] == payload["email"]
        assert body["challenge"] == payload["challenge"]
        assert body["role"] == "CIO"
        assert body["phone"] == "+91 9999999999"

        # No mongo _id leakage
        assert "_id" not in body

    def test_create_lead_minimal_required_fields(self, session):
        unique = uuid.uuid4().hex[:8]
        payload = {
            "name": f"TEST_Min_{unique}",
            "company": "TEST_MinCo",
            "email": f"min_{unique}@example.com",
            "challenge": "ULA renewal coming up.",
        }
        r = session.post(f"{API}/leads", json=payload)
        assert r.status_code == 201, r.text
        body = r.json()
        assert body["role"] is None
        assert body["phone"] is None

    def test_create_lead_invalid_email_returns_422(self, session):
        payload = {
            "name": "TEST_Invalid",
            "company": "TEST_Co",
            "email": "not-an-email",
            "challenge": "Some challenge",
        }
        r = session.post(f"{API}/leads", json=payload)
        assert r.status_code == 422, r.text

    def test_create_lead_missing_required_returns_422(self, session):
        # Missing challenge
        payload = {
            "name": "TEST_Missing",
            "company": "TEST_Co",
            "email": "missing@example.com",
        }
        r = session.post(f"{API}/leads", json=payload)
        assert r.status_code == 422, r.text

    def test_create_lead_empty_required_returns_422(self, session):
        # Empty strings should fail min_length=1
        payload = {
            "name": "",
            "company": "",
            "email": "x@example.com",
            "challenge": "",
        }
        r = session.post(f"{API}/leads", json=payload)
        assert r.status_code == 422, r.text


# ---------- GET /api/leads ----------
class TestListLeads:
    def test_list_includes_created_lead_sorted_desc(self, session):
        # Create a lead and confirm it appears at/near the top
        unique = uuid.uuid4().hex[:8]
        payload = {
            "name": f"TEST_List_{unique}",
            "company": "TEST_ListCo",
            "email": f"list_{unique}@example.com",
            "challenge": "Compliance review request.",
        }
        create = session.post(f"{API}/leads", json=payload)
        assert create.status_code == 201
        created_id = create.json()["id"]
        time.sleep(0.3)

        r = session.get(f"{API}/leads")
        assert r.status_code == 200
        leads = r.json()
        assert isinstance(leads, list)
        assert len(leads) >= 1

        # No mongo _id leakage
        for lead in leads:
            assert "_id" not in lead
            assert "id" in lead
            assert "created_at" in lead

        # Created lead should be persisted
        ids = [l["id"] for l in leads]
        assert created_id in ids, "Newly created lead not found in list (persistence issue)"

        # Sorted desc by created_at
        timestamps = [l["created_at"] for l in leads if l.get("created_at")]
        assert timestamps == sorted(timestamps, reverse=True), "Leads not sorted by created_at desc"
