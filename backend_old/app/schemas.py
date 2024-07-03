from pydantic import BaseModel
from datetime import date

class ApplicationBase(BaseModel):
    nom: str
    categorie: str
    refdate: date
    sys_dernier_control: date
    sys_derniere_synchro: date
    sys_score_confiance: int
    phase_deploiement: str
    type_dev: str
    type_service: str
    code_service_technique: str
    ref_identite: str
    vocation: str
    fournisseur: str
    url: str
    nb_utilisateurs: int
    auditable_pharma: bool
    donnees_sante: bool
    conform_archi_appli: bool
    date_remise_confo: date
    donnees_personnelles: bool
    url_fiche_rgpd: str
    inscri_pra: bool
    inscri_pca: bool
    support_utilisateur: bool
    visible_portail_acces: bool
    plan_secu: str
    plan_deco: str
    obsolesence: str
    plage_service: str
    rto: int
    rpo: int
    alias: str
    progiciel: str
    freq_revue: str
    criticite_si: str
    date_mep: date
    date_eos: date
    date_last_revue: date
    ecart_last_revue: int
    autre_regl: str
    description: str
    description_synthetique: str
    code_pf: str
    trigramme: str
    etat: str
    reference_bia: bool
    classe_exploitation: str
    confidentialite: str
    sla_disponibilite: str
    obsolescence_systeme: str
    sla_integrite: str
    sla_tracabilite: str
    niveau_risque_gxp: str

class ApplicationCreate(ApplicationBase):
    pass

class Application(ApplicationBase):
    id: int

    class Config:
        orm_mode: True

class UserBase(BaseModel):
    fullname: str
    right: int
    role: str
    localisation: str
    mail: str
    tel: str

class UserCreate(UserBase):
    pass

class User(UserBase):
    id: int

    class Config:
        orm_mode: True

class ChangeBase(BaseModel):
    appName: int
    changeType: int
    key: str
    newValue: str
    oldValue: str
    dateOfChange: date
    changeBy
