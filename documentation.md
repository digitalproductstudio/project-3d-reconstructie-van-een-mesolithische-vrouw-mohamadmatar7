# Mesolithische Vrouw Project Documentatie

## Inhoudsopgave
- [Overzicht](#overzicht)
- [Project Structuur](#project-structuur)
  - [1. Startpagina](#1-startpagina)
  - [2. AR Ervaring](#2-ar-ervaring)
  - [3. 3D Model Viewer](#3-3d-model-viewer)
  - [4. Historische Feiten](#4-historische-feiten)
  - [5. Levenswijze](#5-levenswijze)
  - [6. Gereedschappen](#6-gereedschappen)
- [Gebruikte Technologieën](#gebruikte-technologieën)
- [Functionaliteiten](#functionaliteiten)
- [Vereisten](#vereisten)
- [Installatie en Setup](#installatie-en-setup)
- [Technische Architectuur](#technische-architectuur)
- [Model Eigenschappen](#model-eigenschappen)
- [Browser Compatibiliteit](#browser-compatibiliteit)
- [Probleemoplossing](#probleemoplossing)

## Overzicht
Dit project is een interactieve educatieve applicatie gericht op het presenteren van informatie over Mesolithische vrouwen via verschillende digitale media. De applicatie combineert moderne webtechnologieën met historische inhoud om een boeiende leerervaring te creëren over het leven in de Mesolithische periode.

## Project Structuur
De applicatie bestaat uit verschillende belangrijke secties:

### 1. Startpagina (`HomePage.jsx`)
- Hoofdlandingspagina van de applicatie
- Navigatie naar andere secties
- Introductie van het project

### 2. AR Ervaring (`ARpage.jsx`)
- Augmented Reality visualisatie van een Mesolithische vrouw
- Gebruikt AR.js en A-Frame voor 3D-modelweergave
- Interactieve marker-gebaseerde AR-ervaring
- 3D-model met automatische rotatie-animatie

### 3. 3D Model Viewer (`ModelPage.jsx`)
- Gedetailleerde 3D-model onderzoeksinterface
- Interactieve modelmanipulatie
- Gedetailleerd beeld van de Mesolithische vrouw reconstructie

### 4. Historische Feiten (`FactsPage.jsx`)
- Verzameling historische feiten over Mesolithische vrouwen
- Educatieve inhoud over de tijdsperiode
- Op onderzoek gebaseerde informatie

### 5. Levenswijze (`WayOfLifePage.jsx`)
- Gedetailleerde informatie over het dagelijks leven in de Mesolithische tijd
- Culturele en sociale aspecten
- Overlevingstechnieken en praktijken

### 6. Gereedschappen (`ToolsPage.jsx`)
- Informatie over Mesolithische gereedschappen en technologie
- Historische context van gereedschapsgebruik
- Archeologische vondsten

## Gebruikte Technologieën
- React.js voor het frontend framework
- A-Frame (v1.4.2) voor AR/VR ervaringen
- AR.js voor augmented reality functionaliteiten
- Three.js voor 3D-model rendering
- Tailwind CSS voor styling
- Modern JavaScript (ES6+)

## Functionaliteiten
- Interactieve 3D-model weergave
- Augmented Reality visualisatie
- Educatieve content presentatie
- Responsive design voor alle apparaten
- Gebruiksvriendelijke navigatie
- Historische informatie weergave

## Vereisten
### Voor Algemeen Gebruik
- Moderne webbrowser
- Internetverbinding

### Voor AR Functionaliteiten
- Apparaat met camera
- WebGL en WebRTC ondersteuning
- Geprinte Hiro marker (voor AR-ervaring)

## Installatie en Setup
1. Clone de repository
2. Installeer dependencies met npm:
   ```bash
   npm install
   ```
3. Zorg dat alle 3D-modellen correct in de `/public/models/` map staan
4. Start de development server:
   ```bash
   npm run dev
   ```
5. Voor productie build (maakt een statische site):
   ```bash
   npm run build
   ```

## Technische Architectuur
Het project volgt een component-gebaseerde architectuur met React:
- `src/pages/` - Hoofdpagina componenten
- `src/components/` - Herbruikbare UI componenten
- `src/assets/` - Statische assets
- `src/hooks/` - Aangepaste React hooks
- `src/types/` - TypeScript type definities

## Model Eigenschappen
- Schaal: 5x5x5
- Positie: Gecentreerd op marker (0, 0, 0)

## Browser Compatibiliteit
De applicatie werkt op moderne browsers die ondersteuning bieden voor:
- WebGL
- WebRTC
- JavaScript modules
- Moderne CSS features

## Probleemoplossing
Bij problemen:
1. Controleer of je browser up-to-date is
2. Controleer camera permissies
3. Verifieer WebGL ondersteuning
4. Controleer of alle scripts correct laden
5. Controleer op console errors
