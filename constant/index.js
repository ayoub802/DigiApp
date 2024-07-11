import TicketDark from "../assets/ticketDark.png"
import TicketWhite from "../assets/ticketWhite.png"
import SupportDark from "../assets/SupportDark.png"
import SupportWhite from "../assets/SupportWhite.png"
import HomeSouscDark from "../assets/HomeImages/souscrirDark.png"
import HomeSouscWhite from "../assets/HomeImages/souscrirWhite.png"
import HomeRnoouvellDark from "../assets/HomeImages/renouvlementDark.png"
import HomeRnoouvellWhite from "../assets/HomeImages/renouvlementWhite.png"
import HomeNotiDark from "../assets/HomeImages/notificationDark.png"
import HomeNotiWhite from "../assets/HomeImages/notificationWhite.png"
import HomeDocDark from "../assets/HomeImages/documentDark.png"
import HomeDocWhite from "../assets/HomeImages/documentWhite.png"
import HomeSupportDark from "../assets/HomeImages/supportDark.png"
import HomeSupportWhite from "../assets/HomeImages/supportWhite.png"
import { useTranslation } from "react-i18next"


export const homecategories = [
    {
        id: 1,  
        title: "Souscrire",
        imageDark: HomeSouscDark,
        imageWhite: HomeSouscWhite,
        path: "SouscrirV2"
    },
    {
        id: 2,
        title: "Renouvellement",
        imageDark: HomeRnoouvellDark,
        imageWhite: HomeRnoouvellWhite,
        path: "RenewPolice"
    },
    {
        id: 3,
        title: "notifications",
        imageDark: HomeNotiDark,
        imageWhite: HomeNotiWhite,
        path: "Notification"
    },
    {
        id: 4,
        title: "Mes documents",
        imageDark: HomeDocDark,
        imageWhite: HomeDocWhite,
        path: "Document"
    },
    {
        id: 5,
        title: "Support",
        imageDark: HomeSupportDark,
        imageWhite: HomeSupportWhite,
        path: "Support"
    },
]

export const notifications = [
    {
        id: 1,
        title: "ALERTE",
        text: "Votre Police N° 1260006416expire dans 30 jours"
    },
    {
        id: 2,
        title: "PAIEMENT ACCEPTE",
        text: "Votre paiement sous référence DIG050923k a aboutit, votre certificat d’assurance sera disponible dans 48h dans « Mes Documents"
    },
    {
        id: 3,
        title: "MES DOCUMENTS",
        text: "Votre certificat d’Assurance est maintenant disponible dans « Mes Documents »"
    },
    {
        id: 4,
        title: "ALERTE",
        text: "Votre Police N° 1260006416expire dans 30 jours"
    },
    {
        id: 5,
        title: "ALERTE",
        text: "Votre Police N° 1260006416expire dans 30 jours"
    },

]

export const document = [
    // {
    //     id: 1,
    //     title: "Mes polices d’assurances",

    // },
    {
        id: 1,
        statusColor: "success",
        title: 'Mes polices d’assurances',
        documents: [{
        title: "Police N° 1260006654",
        statusColor: "#22D187",
        status: 'En cours de validité',
        downloads: [{
            id: "1",
            label: "Télécharger le certificat d’assurance",
            file: "./certificat.doc"
        },
        {
            id: "1",
            label: "Télécharger la facture",
            file: "./certificat.doc"
        },
        {
            id: "1",
            label: "Télécharger la preuve de paiement",
            file: "./certificat.doc"
        }
        ]
        }, 
        {
        title: "Police N° 1260006416",
        statusColor: "#FF6C59",
        status: 'Expire dans 27 jours',
        downloads: []
        },
        {
        title: "Police N° 0008216255",
        statusColor: "#D41414",
        status: 'Expiré',
        downloads: []
        },
    
    ],
    },
    {
        id: 2,
        statusColor: "success",
        title: 'Autres documents',
        documents: [{
        title: "Police N° 1260006654",
        downloads: [{
            id: "1",
            label: "Télécharger le certificat d’assurance",
            file: "./certificat.doc"
        },
        {
            id: "1",
            label: "Télécharger la facture",
            file: "./certificat.doc"
        },
        {
            id: "1",
            label: "Télécharger la preuve de paiement",
            file: "./certificat.doc"
        }
        ]
        }, 
        {
        title: "Police N° 1260006416",
    
        downloads: []
        },
        {
        title: "Police N° 0008216255",
    
        downloads: []
        },
    
    ],
    }
]

export const support = [
    {
        id: 1,
        title: "Ouvrir un ticket",
        image: TicketDark,
        imageHover: TicketWhite
    },
    {
        id: 2,
        title: "Appelez-nous",
        image: SupportDark,
        imageHover: SupportWhite
    },
]

export const dataMarque = [
    { label: 'Audi', value: 'audi' },
    { label: 'Peugeot', value: 'peugeot' },
    { label: 'Toyota', value: 'toyota' },
    { label: 'Ford', value: 'ford' },
    { label: 'Volkswagen', value: 'volkswagen' },
    { label: 'BMW', value: 'bmw' },
    { label: 'Mercedes-Benz', value: 'mercedes' },
    { label: 'Honda', value: 'honda' },
    { label: 'Chevrolet', value: 'chevrolet' },
    { label: 'Nissan', value: 'nissan' },
    { label: 'Hyundai', value: 'hyundai' },
];


export const dataGenre = [
    { label: 'Camion', value: 'Camion' },
    { label: 'Bus', value: 'Bus' },
    { label: 'Voiture ou Jeep (SUV, 4X4)', value: 'Voiture' },
    { label: 'Moto', value: 'Moto' },
];

export const dataColor = [
    { label: 'Blanc', value: 'blanc' },
    { label: 'Noir', value: 'noir' },
    { label: 'Gris', value: 'gris' },
    { label: 'Bleu', value: 'bleu' },
    { label: 'Rouge', value: 'rouge' },
    { label: 'Vert', value: 'vert' },
    { label: 'Jaune', value: 'jaune' },
    { label: 'Argent', value: 'argent' },
    { label: 'Or', value: 'or' },
    { label: 'Brun', value: 'brun' },
    { label: 'Orange', value: 'orange' },
    { label: 'Violet', value: 'violet' },
    { label: 'Rose', value: 'rose' },
    { label: 'Autre', value: 'autre' },
];

export const dataTonnage = [
    { label: '0-3,5', value: '0-3,5' },
    { label: '3,6-8', value: '3,6-8' },
    { label: '9-15', value: '9-15' },
    { label: '15+', value: '15+' },
];

export const dataPuissance = [
    { label: '1-5', value: '1-5' },
    { label: '6-9', value: '6-9' },
    { label: '10-13', value: '10-13' },
    { label: '14-17', value: '14-17' },
    { label: '17+', value: '17+' },
];


export const dataDurre = [
    { label: '30 Jours', value: '30' },
    { label: '92 Jours', value: '90' },
];

