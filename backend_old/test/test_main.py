import os
import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.main import app
from app.database import Base, get_db
from app.models import Application, User, Change

# Charger les variables d'environnement pour les tests
from dotenv import load_dotenv
load_dotenv(dotenv_path='.env.test')

DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_engine(DATABASE_URL)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Créer une base de données de test
Base.metadata.create_all(bind=engine)

# Dépendance de la session de test
def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db

client = TestClient(app)

@pytest.fixture(scope="module")
def test_db():
    Base.metadata.create_all(bind=engine)
    yield
    Base.metadata.drop_all(bind=engine)

def test_create_application(test_db):
    response = client.post("/applications/", json={
        "nom": "Test App",
        "categorie": "Test Category",
        "refdate": "2024-07-03",
        "sys_dernier_control": "2024-07-03",
        "sys_derniere_synchro": "2024-07-03",
        "sys_score_confiance": 5,
        "phase_deploiement": "Test Phase",
        "type_dev": "Test Dev",
        "type_service": "Test Service",
        "code_service_technique": "TST",
        "ref_identite": "TST123",
        "vocation": "Test Vocation",
        "fournisseur": "Test Supplier",
        "url": "http://test.com",
        "nb_utilisateurs": 100,
        "auditable_pharma": True,
        "donnees_sante": True,
        "conform_archi_appli": True,
        "date_remise_confo": "2024-07-03",
        "donnees_personnelles": True,
        "url_fiche_rgpd": "http://test.com/rgpd",
        "inscri_pra": True,
        "inscri_pca": True,
        "support_utilisateur": True,
        "visible_portail_acces": True,
        "plan_secu": "Test Plan",
        "plan_deco": "Test Plan",
        "obsolesence": "Test Obsolescence",
        "plage_service": "Test Service Range",
        "rto": 1,
        "rpo": 1,
        "alias": "Test Alias",
        "progiciel": "Test Progis",
        "freq_revue": "Test Frequency",
        "criticite_si": "Test Criticality",
        "date_mep": "2024-07-03",
        "date_eos": "2024-07-03",
        "date_last_revue": "2024-07-03",
        "ecart_last_revue": 0,
        "autre_regl": "Test Regulation",
        "description": "Test Description",
        "description_synthetique": "Test Short Description",
        "code_pf": "Test PF",
        "trigramme": "TST",
        "etat": "Active",
        "reference_bia": "Test BIA",
        "classe_exploitation": "Test Class",
        "confidentialite": "Test Confidentiality",
        "sla_disponibilite": "Test SLA Availability",
        "obsolescence_systeme": "Test Obsolescence",
        "sla_integrite": "Test SLA Integrity",
        "sla_tracabilite": "Test SLA Traceability",
        "niveau_risque_gxp": "Test Risk Level"
    })
    assert response.status_code == 200
    data = response.json()
    assert data["nom"] == "Test App"

def test_create_user(test_db):
    response = client.post("/users/", json={
        "fullname": "Test User",
        "right": 1,
        "role": "Admin",
        "localisation": "Test Location",
        "mail": "testuser@test.com",
        "tel": "1234567890"
    })
    assert response.status_code == 200
    data = response.json()
    assert data["fullname"] == "Test User"

def test_create_change(test_db):
    # Create an application and a user first
    app_response = client.post("/applications/", json={
        "nom": "Test App",
        "categorie": "Test Category",
        "refdate": "2024-07-03",
        "fournisseur": "Test Supplier",
        "url": "http://test.com",
        "nb_utilisateurs": 100,
        "auditable_pharma": False,
        "donnees_sante": False,
        "conform_archi_appli": False,
        "donnees_personnelles": False,
        "url_fiche_rgpd": "",
        "inscri_pra": False,
        "inscri_pca": False,
        "support_utilisateur": False,
        "visible_portail_acces": False,
        "rto": 1,
        "rpo": 1,
        "alias": "Test Alias",
        "autre_regl": "Test Regulation",
        "description": "Test Description",
        "description_synthetique": "Test Short Description",
        "code_pf": "TPF",
        "trigramme": "TST",
        "reference_bia": False,
    })
    user_response = client.post("/users/", json={
        "fullname": "Test User",
        "right": 1,
        "role": "Admin",
        "localisation": "Test Location",
        "mail": "testuser@test.com",
        "tel": "0123456789"
    })

    assert app_response.status_code == 200
    assert user_response.status_code == 200

    app_id = app_response.json()["id"]
    user_id = user_response.json()["id"]

    change_response = client.post("/changes/", json={
        "appName": app_id,
        "changeType": 1,
        "key": "Test Key",
        "newValue": "New Value",
        "oldValue": "Old Value",
        "dateOfChange": "2024-07-03",
        "changeBy": user_id
    })

    assert change_response.status_code == 200
    data = change_response.json()
    assert data["appName"] == app_id
    assert data["changeBy"] == user_id
