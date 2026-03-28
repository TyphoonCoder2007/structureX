/**
 * StructureX frontend controller.
 */

const API = "/api";
const DEFAULT_MAP_KEY = "e6jRUxTkKH6UOJQnLqvl";
const DETAILED_STYLE_URL = `https://api.maptiler.com/maps/streets-v2-dark/style.json?key=${DEFAULT_MAP_KEY}`;
const DEFAULT_VIEW = {
    center: [77.5946, 12.9716],
    zoom: 14.2,
    pitch: 48,
    bearing: -22,
};
const FALLBACK_LOCATIONS = {
    LOC_001: { label: "Mumbai Bridge A", center: [72.8777, 19.076] },
    LOC_002: { label: "Delhi Pipeline B", center: [77.209, 28.6139] },
    LOC_003: { label: "Chennai Building C", center: [80.2707, 13.0827] },
    LOC_004: { label: "Kolkata Bridge D", center: [88.3639, 22.5726] },
    LOC_005: { label: "Bangalore Pipeline E", center: [77.5946, 12.9716] },
};
const THEME = {
    safe: "#3b82f6",
    warning: "#f59e0b",
    critical: "#ef4444",
    accent: "#3b82f6",
    grid: "rgba(255, 255, 255, 0.08)",
    text: "#c8d6e5",
    muted: "#5a6e84",
};
const WEATHER_CODE_LABELS = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Depositing rime fog",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Dense drizzle",
    56: "Light freezing drizzle",
    57: "Dense freezing drizzle",
    61: "Slight rain",
    63: "Moderate rain",
    65: "Heavy rain",
    66: "Light freezing rain",
    67: "Heavy freezing rain",
    71: "Slight snow fall",
    73: "Moderate snow fall",
    75: "Heavy snow fall",
    77: "Snow grains",
    80: "Slight rain showers",
    81: "Moderate rain showers",
    82: "Violent rain showers",
    85: "Slight snow showers",
    86: "Heavy snow showers",
    95: "Thunderstorm",
    96: "Thunderstorm with slight hail",
    99: "Thunderstorm with heavy hail",
};
const CAPABILITY_SECTIONS = [
    {
        category: "Category 1",
        title: "Expanded Hazard Layers",
        icon: "fa-triangle-exclamation",
        summary: "Multi-hazard situational awareness and cascading hazard overlays beyond earthquakes.",
        features: [
            {
                id: "01",
                title: "Multi-Hazard Integration",
                bullets: [
                    "Flood / storm surge streams: river gauges, rainfall radar, sea-level and levee stress watch.",
                    "Wildfire layers: fire perimeters, wind direction, vegetation dryness, gas-leak ignition risk.",
                    "Landslide, liquefaction, tsunami, and extreme heat / cold overlays linked to soil moisture and shaking intensity.",
                ],
            },
            {
                id: "02",
                title: "Cascading Failure Simulation",
                bullets: [
                    "Network dependency mapping for power, water, transport, hospitals, data centers, and emergency services.",
                    "Domino-effect prediction: route severance, emergency isolation, shelter cutoffs, and downstream infrastructure collapse.",
                ],
            },
        ],
    },
    {
        category: "Category 2",
        title: "Advanced Sensing & Monitoring",
        icon: "fa-satellite-dish",
        summary: "Next-generation sensing layers combining orbital, fiber, mobile, and robotic inspection intelligence.",
        features: [
            {
                id: "04",
                title: "Fiber Optic SHM",
                bullets: [
                    "DAS for ground motion, traffic loads, and pipeline leak signatures using telecom fiber.",
                    "DTS for tunnels, bridges, cables, fire hotspots, and coolant-failure detection.",
                ],
            },
            {
                id: "05",
                title: "Crowdsourced & Mobile Data",
                bullets: [
                    "Smartphone accelerometer aggregation for dense shake maps where seismic stations are sparse.",
                    "NLP pipelines for social media, citizen apps, and first-report detection of shaking, damage, and gas smells.",
                ],
            },
            {
                id: "06",
                title: "Drone & Robotic Inspection",
                bullets: [
                    "Automated dispatch of drones to high-risk bridges, towers, and corridors immediately after events.",
                    "Onboard computer vision for cracks, spalling, leaning, debris, and thermal anomalies in real time.",
                ],
            },
        ],
    },
    {
        category: "Category 3",
        title: "Risk & Decision Intelligence",
        icon: "fa-brain",
        summary: "Decision support focused on what to do, in what order, and with which resources.",
        features: [
            {
                id: "07",
                title: "Population & Occupancy Dynamics",
                bullets: [
                    "Real-time occupancy via mobility or access systems for vulnerable buildings at the moment of impact.",
                    "Critical facility registry for hospitals, shelters, police, fire, data centers, and chemical plants.",
                ],
            },
            {
                id: "08",
                title: "Dynamic Evacuation & Route Planning",
                bullets: [
                    "Safe route calculation using bridge status, debris, flooding, fire perimeters, and congestion.",
                    "Shelter suitability scoring based on structure safety plus power and water utility availability.",
                ],
            },
            {
                id: "09",
                title: "Economic & Insurance Impact",
                bullets: [
                    "Real-time insured and uninsured loss estimation integrated with catastrophe risk models.",
                    "Claim automation packages with asset health history and damage probability pre-filled for rapid recovery.",
                ],
            },
            {
                id: "10",
                title: "Resource Allocation & Logistics",
                bullets: [
                    "Live inventory of generators, sandbags, medical supplies, repair material, and emergency depots.",
                    "Optimized dispatch recommendations based on priority, travel time, crew capability, and traffic.",
                ],
            },
        ],
    },
    {
        category: "Category 4",
        title: "AI & Machine Learning",
        icon: "fa-robot",
        summary: "Self-improving models, automated briefings, and predictive risk forecasting.",
        features: [
            {
                id: "11",
                title: "Self-Learning Vulnerability Models",
                bullets: [
                    "Post-event feedback loops for fragility calibration, retrofit effectiveness, and unexpected failure patterns.",
                    "Transfer learning across similar asset classes and regions after major events.",
                ],
            },
            {
                id: "12",
                title: "Generative AI Emergency Response",
                bullets: [
                    "Automated PDF / HTML emergency action plans with maps, affected assets, actions, and contact lists.",
                    "Executive natural-language briefings summarizing event severity, inspections, and evacuation posture.",
                ],
            },
            {
                id: "13",
                title: "Predictive Seismic Risk Forecasting",
                bullets: [
                    "24-72 hour probabilistic forecasting from seismic swarms, foreshocks, seasonal soil state, and asset health trends.",
                    "Dynamic risk uplift for already degraded assets before the main event occurs.",
                ],
            },
        ],
    },
    {
        category: "Category 5",
        title: "Resilience Planning",
        icon: "fa-city",
        summary: "Long-horizon adaptation, retrofit prioritization, and code-driven resilience planning.",
        features: [
            {
                id: "14",
                title: "Scenario Planning & Stress Testing",
                bullets: [
                    "What-if simulation for hypothetical earthquakes, downtown fault scenarios, and pre-computed cascade outcomes.",
                    "Planner-facing retrofitting and mitigation comparisons before an event happens.",
                ],
            },
            {
                id: "15",
                title: "Retrofit Prioritization Engine",
                bullets: [
                    "Cost-benefit scoring across retrofit cost, replacement cost, life safety impact, and return on resilience.",
                    "Prioritization of low-cost / high-consequence assets for fast resilience gains.",
                ],
            },
            {
                id: "16",
                title: "Building Code Compliance",
                bullets: [
                    "Code-gap analysis against current seismic requirements with non-compliant asset flagging.",
                    "Permit integration so retrofit progress updates vulnerability scores automatically.",
                ],
            },
            {
                id: "17",
                title: "Climate Adaptation Integration",
                bullets: [
                    "Long-term hazard trends for sea-level rise, storm intensity, drought-driven subsidence, and chronic heat stress.",
                    "Future-state vulnerability modeling for assets that are safe today but not in 10-20 years.",
                ],
            },
        ],
    },
    {
        category: "Category 6",
        title: "User Experience & Accessibility",
        icon: "fa-users-viewfinder",
        summary: "Different views for executives, responders, engineers, and citizens.",
        features: [
            {
                id: "18",
                title: "Role-Based Dashboards",
                bullets: [
                    "Executive dashboard: city KPIs, heatmap, funding and impact exposure.",
                    "Emergency manager dashboard: event response, evacuation zones, and resource tracking.",
                    "Engineer dashboard and public portal: asset diagnostics, inspection workflows, shelters, and safety guidance.",
                ],
            },
        ],
    },
];

const state = {
    map: null,
    mapReady: false,
    mapFailed: false,
    mapMarker: null,
    activeBuildingRequestId: 0,
    selectedBuildingKey: null,
    geocodeTimer: null,
    selectedFile: null,
    analysisData: null,
    selectedBuilding: null,
    recentBuildings: [],
    aiMode: "normal",
    activeChart: "vibration",
    activeBottomTab: "charts",
    activeRightTab: "overview",
    rightPanelCollapsed: false,
    rightTabTrayExpanded: false,
    leftPanelCollapsed: false,
    satelliteBlueprints: [],
    satellites: [],
    selectedSatelliteId: null,
    satelliteInterval: null,
    telemetrySeries: {
        labels: [],
        satelliteHealth: [],
        networkHealth: [],
        trafficFlow: [],
    },
    activeHeaderView: "dashboard",
    bottomExpanded: true,
    timelinePlaying: false,
    timelineInterval: null,
    latestSearchResults: [],
    activeSearchIndex: -1,
    mapEnhancementsApplied: false,
    buildingInteractionBound: false,
    weatherTarget: null,
    weatherData: null,
    weatherLoading: false,
    weatherInterval: null,
    activeWeatherRequestId: 0,
    resilienceData: null,
    resilienceLoading: false,
    resilienceRole: "executive",
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

function init() {
    initMap();
    initUpload();
    initSliders();
    initBottomPanel();
    initLeftPanel();
    initRightPanel();
    initSatelliteTelemetry();
    initWeatherPanel();
    initPlaceSearch();
    initAIMode();
    initAlert();
    initDetailPanel();
    initNav();
    initAnalyzeButton();
    initResizeHandling();
    renderAnalysisHistory();
    renderResiliencePanel();
    renderWeatherPanel();
    updateGauge(0, "SAFE");
    setSystemStatus("System online");
}

function initMap() {
    const container = $("#map-container");
    if (!container) {
        return;
    }

    if (!window.maptilersdk) {
        showMapFallback("Map SDK unavailable. Scenario analysis is still operational.");
        return;
    }

    try {
        maptilersdk.config.apiKey = DEFAULT_MAP_KEY;
        state.map = new maptilersdk.Map({
            container: "map-container",
            style: DETAILED_STYLE_URL,
            center: DEFAULT_VIEW.center,
            zoom: DEFAULT_VIEW.zoom,
            pitch: DEFAULT_VIEW.pitch,
            bearing: DEFAULT_VIEW.bearing,
            antialias: false,
            maxPitch: 74,
            fullscreenControl: false,
            navigationControl: false,
        });

        state.map.addControl(
            new maptilersdk.NavigationControl({ showCompass: true, showZoom: true }),
            "bottom-right"
        );

        state.map.on("load", () => {
            state.mapReady = true;
            addMapAtmosphere();
            setSystemStatus("Map online");

            const applyEnhancements = () => {
                if (window.requestIdleCallback) {
                    window.requestIdleCallback(finalizeMapEnhancements, { timeout: 700 });
                    return;
                }
                window.setTimeout(finalizeMapEnhancements, 120);
            };

            state.map.once("idle", applyEnhancements);
        });

        state.map.on("error", () => {
            if (!state.mapReady) {
                showMapFallback("Map could not fully initialize. Core analysis remains available.");
            }
        });
    } catch (error) {
        console.error("Map init failed", error);
        showMapFallback("Map failed to initialize. Core analysis remains available.");
    }
}

function showMapFallback(message) {
    state.mapFailed = true;
    const container = $("#map-container");
    if (!container) {
        return;
    }

    container.innerHTML = `
        <div class="map-fallback">
            <div class="map-fallback-grid"></div>
            <div class="map-fallback-card glass">
                <div class="map-fallback-title">STRUCTUREX GEO VIEW</div>
                <div class="map-fallback-text">${message}</div>
                <div class="map-fallback-subtext">Upload a dataset or run a scenario to keep using the platform.</div>
            </div>
        </div>
    `;
    setSystemStatus("Map offline fallback");
}

function addMapAtmosphere() {
    if (!state.map) {
        return;
    }

    try {
        state.map.setFog({
            color: "rgba(4, 14, 30, 0.92)",
            "high-color": "rgba(6, 24, 48, 0.85)",
            "space-color": "rgba(1, 4, 12, 1)",
            "horizon-blend": 0.1,
            "star-intensity": 0.15,
        });
    } catch (error) {
        console.warn("Fog setup skipped", error);
    }
}

function finalizeMapEnhancements() {
    if (!state.mapReady || !state.map || state.mapEnhancementsApplied) {
        return;
    }

    enhanceMapDetailLayers();
    add3DBuildings();
    initBuildingInteraction();
    state.mapEnhancementsApplied = true;

    state.map.easeTo({
        pitch: 54,
        duration: 900,
        essential: true,
    });
    setSystemStatus("3D map linked");
}

function enhanceMapDetailLayers() {
    if (!state.map) {
        return;
    }

    const style = state.map.getStyle();
    const sources = style?.sources || {};
    const candidateSources = ["openmaptiles", "maptiler_planet"];
    const sourceName = candidateSources.find((name) => sources[name]);
    if (!sourceName) {
        return;
    }

    const labelLayerId = style.layers?.find((layer) => layer.type === "symbol" && layer.layout?.["text-field"])?.id;

    addLayerIfMissing({
        id: "sx-water-outline",
        source: sourceName,
        "source-layer": "water",
        type: "line",
        paint: {
            "line-color": "rgba(96, 165, 250, 0.45)",
            "line-width": ["interpolate", ["linear"], ["zoom"], 10, 0.4, 16, 1],
            "line-opacity": 0.65,
        },
    }, labelLayerId);

    addLayerIfMissing({
        id: "sx-park-soft",
        source: sourceName,
        "source-layer": "landuse",
        type: "fill",
        filter: ["match", ["get", "class"], ["park", "grass", "wood"], true, false],
        paint: {
            "fill-color": "rgba(74, 222, 128, 0.05)",
            "fill-opacity": 0.4,
        },
    }, labelLayerId);

    addLayerIfMissing({
        id: "sx-road-major",
        source: sourceName,
        "source-layer": "transportation",
        type: "line",
        filter: ["match", ["get", "class"], ["motorway", "trunk", "primary", "secondary"], true, false],
        layout: {
            "line-join": "round",
            "line-cap": "round",
        },
        paint: {
            "line-color": "rgba(203, 213, 225, 0.24)",
            "line-width": ["interpolate", ["linear"], ["zoom"], 10, 0.5, 15, 1.4, 18, 2.6],
            "line-opacity": 0.7,
        },
    }, labelLayerId);
}

function addLayerIfMissing(layerConfig, beforeId) {
    if (!state.map || state.map.getLayer(layerConfig.id)) {
        return;
    }

    try {
        state.map.addLayer(layerConfig, beforeId);
    } catch (error) {
        console.warn(`Skipped layer ${layerConfig.id}`, error);
    }
}

function add3DBuildings() {
    if (!state.map || state.map.getLayer("3d-buildings")) {
        return;
    }

    const style = state.map.getStyle();
    const layers = style?.layers || [];
    const candidateSources = ["maptiler_planet", "openmaptiles"];
    const sourceName = candidateSources.find((name) => style?.sources?.[name]);
    if (!sourceName) {
        console.warn("No vector source found for 3D buildings");
        return;
    }

    const labelLayerId = layers.find((layer) => layer.type === "symbol" && layer.layout?.["text-field"])?.id;

    try {
        state.map.addLayer(
            {
                id: "3d-buildings",
                source: sourceName,
                "source-layer": "building",
                type: "fill-extrusion",
                filter: ["!has", "hide_3d"],
                minzoom: 14,
                paint: {
                    "fill-extrusion-base": ["coalesce", ["get", "render_min_height"], 0],
                    "fill-extrusion-height": ["coalesce", ["get", "render_height"], 12],
                    "fill-extrusion-color": [
                        "interpolate",
                        ["linear"],
                        ["coalesce", ["get", "render_height"], 12],
                        0, "#081a30",
                        20, "#0d2740",
                        60, "#103558",
                        120, "#16486d",
                        220, "#1c5f8d",
                    ],
                    "fill-extrusion-opacity": 0.88,
                },
            },
            labelLayerId
        );

        state.map.addLayer(
            {
                id: "3d-buildings-highlight",
                source: sourceName,
                "source-layer": "building",
                type: "fill-extrusion",
                filter: ["in", ["id"], ["literal", []]],
                minzoom: 14,
                paint: {
                    "fill-extrusion-base": ["coalesce", ["get", "render_min_height"], 0],
                    "fill-extrusion-height": ["coalesce", ["get", "render_height"], 12],
                    "fill-extrusion-color": "#3b82f6",
                    "fill-extrusion-opacity": 0.98,
                },
            },
            labelLayerId
        );
    } catch (error) {
        console.warn("3D building setup skipped", error);
    }
}

function initBuildingInteraction() {
    if (!state.map || !state.map.getLayer("3d-buildings") || state.buildingInteractionBound) {
        return;
    }

    state.buildingInteractionBound = true;

    state.map.on("mouseenter", "3d-buildings", () => {
        state.map.getCanvas().style.cursor = "pointer";
    });

    state.map.on("mouseleave", "3d-buildings", () => {
        state.map.getCanvas().style.cursor = "";
    });

    state.map.on("click", "3d-buildings", (event) => {
        const feature = event.features?.[0];
        if (feature) {
            analyzeBuilding(feature, event.lngLat);
        }
    });

    state.map.on("click", (event) => {
        const features = state.map.queryRenderedFeatures(event.point, { layers: ["3d-buildings"] });
        if (!features.length) {
            deselectBuilding();
        }
    });
}

async function analyzeBuilding(feature, lngLat) {
    if (!lngLat) {
        return;
    }

    const selectionKey = getBuildingSelectionKey(feature, lngLat);
    state.activeBuildingRequestId += 1;
    const requestId = state.activeBuildingRequestId;
    state.selectedBuildingKey = selectionKey;

    highlightBuilding(feature);
    state.selectedBuilding = { feature, lngLat, key: selectionKey };
    centerOnCoordinates([lngLat.lng, lngLat.lat], 17.2);
    openBuildingPanelLoading(lngLat);

    const locationMeta = await reverseGeocode(lngLat.lng, lngLat.lat);
    if (!isActiveBuildingRequest(requestId, selectionKey)) {
        return;
    }
    setWeatherTarget({
        name: locationMeta.label,
        address: locationMeta.address,
        area: locationMeta.area,
        lat: lngLat.lat,
        lng: lngLat.lng,
        source: "Building selection",
    });

    const height = Number(feature.properties?.render_height || feature.properties?.height || 12);
    const payload = {
        lat: lngLat.lat,
        lng: lngLat.lng,
        height,
        address: locationMeta.address,
        area_name: locationMeta.area,
        properties: feature.properties || {},
    };

    try {
        const response = await fetch(`${API}/building-analyze`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error(`Building analysis failed (${response.status})`);
        }

        const result = await response.json();
        if (!isActiveBuildingRequest(requestId, selectionKey)) {
            return;
        }

        renderBuildingAnalysis(result, locationMeta, height, lngLat, feature);
        addToHistory({
            id: selectionKey,
            address: locationMeta.area || locationMeta.address,
            fullAddress: locationMeta.address,
            height,
            risk: Number(result.risk_score || 0),
            lngLat,
        });
        runResilienceAnalysis({ silent: true });
        setSystemStatus("Building AI completed");
    } catch (error) {
        if (!isActiveBuildingRequest(requestId, selectionKey)) {
            return;
        }
        console.error(error);
        renderBuildingError(locationMeta);
        setSystemStatus("Building AI fallback");
    }
}

function highlightBuilding(feature) {
    if (!state.map || !state.map.getLayer("3d-buildings-highlight")) {
        return;
    }

    state.map.setFilter("3d-buildings-highlight", ["in", ["id"], ["literal", []]]);

    if (feature?.id !== undefined && feature?.id !== null) {
        state.map.setFilter("3d-buildings-highlight", ["in", ["id"], ["literal", [feature.id]]]);
    }

    const geometry = feature?.geometry;
    if (!geometry) {
        return;
    }

    let coords = null;
    if (geometry.type === "Polygon") {
        coords = geometry.coordinates?.[0]?.[0];
    } else if (geometry.type === "MultiPolygon") {
        coords = geometry.coordinates?.[0]?.[0]?.[0];
    }
    if (coords) {
        addOrMoveMarker(coords, { mode: "selected scanning" });
    }
}

function addOrMoveMarker(coords, options = {}) {
    if (!state.mapReady || !state.map || !coords) {
        return;
    }

    const mode = options.mode || "pending";

    if (!state.mapMarker) {
        const markerElement = document.createElement("div");
        markerElement.className = `infra-marker ${mode}`;
        markerElement.innerHTML = `
            <span class="marker-ring"></span>
            <span class="marker-scan"></span>
            <span class="marker-scan marker-scan-delayed"></span>
            <i class="fas fa-building"></i>
        `;
        state.mapMarker = new maptilersdk.Marker({ element: markerElement, anchor: "center" })
            .setLngLat(coords)
            .addTo(state.map);
        return;
    }

    state.mapMarker.setLngLat(coords);
    state.mapMarker.getElement().className = `infra-marker ${mode}`;
}

function openBuildingPanelLoading(lngLat) {
    toggleRightPanel(false);
    setBuildingPanelVisible(true);
    switchRightTab("review");
    renderSatelliteTelemetry();
    $("#detail-panel").classList.remove("expanded");
    $("#det-name").textContent = "Building analysis in progress";
    $("#det-district").textContent = `${lngLat.lat.toFixed(4)}, ${lngLat.lng.toFixed(4)}`;
    $("#building-loading").style.display = "block";
    $("#building-result").innerHTML = `
        <div class="review-loading-grid">
            <div class="review-skeleton review-skeleton-lg"></div>
            <div class="review-skeleton review-skeleton-md"></div>
            <div class="review-skeleton review-skeleton-sm"></div>
            <div class="review-skeleton review-skeleton-md"></div>
        </div>
    `;
}

function renderBuildingAnalysis(result, locationMeta, height, lngLat, feature) {
    $("#building-loading").style.display = "none";
    $("#det-name").textContent = locationMeta.label;
    $("#det-district").textContent = locationMeta.address;

    const risk = Number(result.risk_score || 0);
    const level = risk >= 70 ? "critical" : risk >= 40 ? "warning" : "safe";
    const color = getRiskColor(risk);
    const type = feature.properties?.type || "building";
    const icon = type.includes("bridge") ? "fa-bridge" : type.includes("industrial") ? "fa-industry" : "fa-building";
    const profile = deriveBuildingProfile(feature, height, result, locationMeta, lngLat);

    $("#det-type").innerHTML = `<i class="fas ${icon}"></i>`;

    $("#building-result").innerHTML = `
        <section class="review-hero">
            <div class="ai-risk-row">
                <div>
                    <div class="ai-risk-label">AI-powered structural review</div>
                    <div class="mini-note">${profile.assetType} in ${locationMeta.area}</div>
                </div>
                <div class="ai-risk-score" style="color:${color}">${risk.toFixed(1)}</div>
            </div>
            <div class="review-status-row">
                <span class="review-status-chip ${level}">${riskToLabel(risk)}</span>
                <span class="review-status-meta">${profile.priority}</span>
            </div>
            <div class="ai-summary">${escapeHtml(result.summary || "No executive summary returned.")}</div>
        </section>
        <section class="review-grid">
            ${renderMetricCard("Asset type", profile.assetType, level)}
            ${renderMetricCard("Estimated floors", String(profile.estimatedFloors), "")}
            ${renderMetricCard("Height", `${height.toFixed(1)}m`, "")}
            ${renderMetricCard("Occupancy profile", profile.operationalExposure, "")}
            ${renderMetricCard("Coordinates", `${lngLat.lat.toFixed(4)}, ${lngLat.lng.toFixed(4)}`, "")}
            ${renderMetricCard("Construction profile", profile.constructionProfile, "")}
        </section>
        ${renderDetailSection("Structural integrity", result.structural_integrity)}
        ${renderDetailSection("Asset-specific findings", result.asset_specific_findings)}
        ${renderDetailSection("Load path and lateral system", result.load_path_and_lateral_system)}
        ${renderDetailSection("Seismic vulnerability", result.seismic_vulnerability)}
        ${renderDetailSection("Soil and foundation", result.soil_foundation)}
        ${renderDetailSection("Climate impact", result.climate_impact)}
        ${renderDetailSection("Environmental hazards", result.environmental_hazards)}
        ${renderDetailSection("Serviceability outlook", result.serviceability_outlook)}
        ${renderDetailSection("Maintenance hotspots", result.maintenance_hotspots)}
        ${renderDetailSection("Lifecycle factors", result.lifecycle_factors)}
        ${renderDetailSection("Inspection priority", profile.priority)}
        ${renderDetailSection("Confidence notes", profile.confidenceNotes)}
        ${renderDetailSection("Data gaps", result.data_gaps)}
        ${renderMetadataSection(feature, locationMeta, profile)}
        <div class="ai-section ai-section-emphasis">
            <div class="ai-section-title"><i class="fas fa-tools"></i> Recommended actions</div>
            <ol class="rec-list">
                ${(result.recommendations || []).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
            </ol>
        </div>
    `;
    renderSelectionSummary({ result, locationMeta, height, lngLat, profile, risk });
}

function renderBuildingError(locationMeta) {
    $("#building-loading").style.display = "none";
    toggleRightPanel(false);
    setBuildingPanelVisible(true);
    switchRightTab("review");
    $("#detail-panel").classList.remove("expanded");
    $("#det-name").textContent = locationMeta.label;
    $("#det-district").textContent = locationMeta.address;
    $("#building-result").innerHTML = `
        <div class="ai-summary">
            Building AI analysis is unavailable right now. Map selection, scenario tools, and CSV analysis still work.
        </div>
        <div class="ai-section">
            <div class="ai-section-title"><i class="fas fa-shield"></i> Next step</div>
            <div class="ai-section-content">
                Use the scenario engine or upload a CSV dataset to continue risk evaluation while the building-specific AI service falls back.
            </div>
        </div>
    `;
    renderSelectionSummary({ locationMeta, fallback: true });
}

function renderDetailSection(title, content) {
    if (!content) {
        return "";
    }

    return `
        <div class="ai-section">
            <div class="ai-section-title"><i class="fas fa-angle-right"></i> ${escapeHtml(title)}</div>
            <div class="ai-section-content">${formatParagraphs(content)}</div>
        </div>
    `;
}

function renderMetricCard(label, value, tone) {
    return `
        <div class="building-metric ${tone}">
            <span class="building-metric-label">${escapeHtml(label)}</span>
            <span class="building-metric-value">${escapeHtml(value)}</span>
        </div>
    `;
}

function renderMetadataSection(feature, locationMeta, profile) {
    const details = [
        ["Map source label", locationMeta.label],
        ["Mapped district", locationMeta.area],
        ["Feature kind", profile.featureKind],
        ["Footprint profile", profile.footprintProfile],
    ].filter(([, value]) => value);

    return `
        <div class="ai-section">
            <div class="ai-section-title"><i class="fas fa-table-list"></i> Asset dossier</div>
            <div class="metadata-grid">
                ${details.map(([label, value]) => `
                    <div class="metadata-row">
                        <span class="metadata-label">${escapeHtml(label)}</span>
                        <span class="metadata-value">${escapeHtml(value)}</span>
                    </div>
                `).join("")}
            </div>
        </div>
    `;
}

function deriveBuildingProfile(feature, height, result, locationMeta, lngLat) {
    const type = String(feature.properties?.type || "building");
    const estimatedFloors = Number(result.estimated_floors || Math.max(1, Math.round(height / 3.5)));
    const assetType = type.includes("bridge")
        ? "Bridge-linked structure"
        : type.includes("industrial")
            ? "Industrial facility"
            : height > 60
                ? "High-rise building"
                : "Urban building";

    return {
        assetType,
        estimatedFloors,
        operationalExposure: result.operational_exposure || (estimatedFloors >= 15 ? "High occupancy / high consequence" : "Moderate occupancy / standard consequence"),
        constructionProfile: result.construction_profile || (height > 45 ? "Likely reinforced concrete or composite frame with lateral-force considerations." : "Likely reinforced concrete frame or masonry-supported urban construction."),
        priority: result.inspection_priority || (Number(result.risk_score || 0) >= 70 ? "Immediate engineering inspection recommended." : Number(result.risk_score || 0) >= 40 ? "Priority field inspection recommended." : "Routine inspection cadence remains acceptable."),
        confidenceNotes: result.confidence_notes || "This review is based on map geometry, location context, and inferred engineering assumptions. A survey-grade assessment would require structural drawings, material data, and on-site inspection.",
        footprintProfile: feature.geometry?.type === "Polygon" ? "Single footprint polygon" : feature.geometry?.type === "MultiPolygon" ? "Composite footprint geometry" : "Geometry available",
        featureKind: type || "building",
        coordinates: `${lngLat.lat.toFixed(4)}, ${lngLat.lng.toFixed(4)}`,
        locationLabel: locationMeta.label,
    };
}

function deselectBuilding() {
    state.activeBuildingRequestId += 1;
    state.selectedBuilding = null;
    state.selectedBuildingKey = null;
    if (state.map && state.map.getLayer("3d-buildings-highlight")) {
        state.map.setFilter("3d-buildings-highlight", ["in", ["id"], ["literal", []]]);
    }
    if (state.mapMarker) {
        state.mapMarker.getElement().className = "infra-marker pending";
    }
    $("#detail-panel").classList.remove("expanded");
    setBuildingPanelVisible(false);
    renderSelectionSummary();
    renderSatelliteTelemetry();
}

function getBuildingSelectionKey(feature, lngLat) {
    if (feature?.id !== undefined && feature?.id !== null) {
        return `feature:${feature.id}`;
    }
    return `coords:${lngLat.lng.toFixed(6)}:${lngLat.lat.toFixed(6)}`;
}

function isActiveBuildingRequest(requestId, selectionKey) {
    return (
        requestId === state.activeBuildingRequestId &&
        selectionKey === state.selectedBuildingKey
    );
}

async function reverseGeocode(lng, lat) {
    const fallback = {
        label: "Selected structure",
        address: `${lat.toFixed(4)}, ${lng.toFixed(4)}`,
        area: "Mapped zone",
    };

    try {
        const response = await fetch(
            `https://api.maptiler.com/geocoding/${lng},${lat}.json?key=${DEFAULT_MAP_KEY}`
        );
        if (!response.ok) {
            return fallback;
        }
        const payload = await response.json();
        const feature = payload.features?.[0];
        if (!feature) {
            return fallback;
        }

        const context = feature.context || [];
        const area =
            context.find((item) => item.id.startsWith("place"))?.text ||
            context.find((item) => item.id.startsWith("region"))?.text ||
            feature.text ||
            fallback.area;

        return {
            label: feature.text || "Selected structure",
            address: feature.place_name || fallback.address,
            area,
        };
    } catch (error) {
        console.warn("Reverse geocode failed", error);
        return fallback;
    }
}

function initPlaceSearch() {
    const input = $("#place-search");
    const dropdown = $("#search-results");
    const form = $("#place-search-form");
    if (!input || !dropdown) {
        return;
    }

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const query = input.value.trim();
        if (!query) {
            return;
        }
        await runPlaceSearch(query, { autoSelectFirst: true });
    });

    input.addEventListener("input", () => {
        clearTimeout(state.geocodeTimer);
        const query = input.value.trim();
        state.activeSearchIndex = -1;
        if (query.length < 2) {
            dropdown.style.display = "none";
            dropdown.innerHTML = "";
            $("#search-meta").textContent = "Search any city, address, landmark, district, or country.";
            return;
        }

        $("#search-meta").textContent = "Searching worldwide map data...";
        state.geocodeTimer = setTimeout(() => runPlaceSearch(query), 250);
    });

    input.addEventListener("keydown", async (event) => {
        const items = $$(".search-result-item");
        if (!items.length && event.key === "Enter") {
            event.preventDefault();
            const query = input.value.trim();
            if (query) {
                await runPlaceSearch(query, { autoSelectFirst: true });
            }
            return;
        }

        if (!items.length) {
            return;
        }

        if (event.key === "ArrowDown") {
            event.preventDefault();
            state.activeSearchIndex = (state.activeSearchIndex + 1) % items.length;
            updateSearchSelection(items);
            return;
        }

        if (event.key === "ArrowUp") {
            event.preventDefault();
            state.activeSearchIndex = (state.activeSearchIndex - 1 + items.length) % items.length;
            updateSearchSelection(items);
            return;
        }

        if (event.key === "Enter" && state.activeSearchIndex >= 0) {
            event.preventDefault();
            items[state.activeSearchIndex]?.click();
        }
    });

    document.addEventListener("click", (event) => {
        if (!event.target.closest(".search-wrap")) {
            dropdown.style.display = "none";
        }
    });
}

async function runPlaceSearch(query, options = {}) {
    const dropdown = $("#search-results");
    const meta = $("#search-meta");

    try {
        // Step 1: MapTiler Geocoding (Primary, Fast)
        try {
            const mtResponse = await fetch(
                `https://api.maptiler.com/geocoding/${encodeURIComponent(query)}.json?key=${DEFAULT_MAP_KEY}&limit=8&types=poi,address,place&autocomplete=true&fuzzyMatch=true`
            );
            if (mtResponse.ok) {
                const mtPayload = await mtResponse.json();
                features = mtPayload.features || [];
            } else {
                console.warn(`MapTiler search returned ${mtResponse.status}`);
            }
        } catch (e) {
            console.warn("MapTiler fetch failed, relying on Nominatim", e);
        }

        // Step 2: Nominatim fallback (Deep Scan for Monuments/Architecture)
        // If query looks like a specific building or if MapTiler results are low
        if (features.length < 3 || query.length > 5) {
            try {
                const nomResponse = await fetch(
                    `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=5&addressdetails=1`
                );
                if (nomResponse.ok) {
                    const nomData = await nomResponse.json();
                    const nomFeatures = nomData.map(node => ({
                        id: `nom-${node.place_id}`,
                        text: node.display_name.split(",")[0],
                        place_name: node.display_name,
                        center: [parseFloat(node.lon), parseFloat(node.lat)],
                        bbox: node.boundingbox ? [parseFloat(node.boundingbox[2]), parseFloat(node.boundingbox[0]), parseFloat(node.boundingbox[3]), parseFloat(node.boundingbox[1])] : null,
                        properties: {
                            type: node.type,
                            class: node.class,
                            osm_type: node.osm_type,
                            source: "OpenStreetMap"
                        }
                    }));
                    
                    // Merge and deduplicate (roughly by coordinates)
                    nomFeatures.forEach(nom => {
                        const exists = features.some(f => 
                            Math.abs(f.center[0] - nom.center[0]) < 0.001 && 
                            Math.abs(f.center[1] - nom.center[1]) < 0.001
                        );
                        if (!exists) features.push(nom);
                    });
                }
            } catch (e) {
                console.warn("Nominatim fallback failed", e);
            }
        }

        state.latestSearchResults = features;

        if (!features.length) {
            dropdown.innerHTML = `<div class="search-result-empty">No matching places or monuments found.</div>`;
            dropdown.style.display = "block";
            meta.textContent = "Try searching for specific architectural names like 'Eiffel Tower' or 'Taj Mahal'.";
            return;
        }

        if (options.autoSelectFirst) {
            selectPlaceResult(features[0]);
            dropdown.style.display = "none";
            return;
        }

        dropdown.innerHTML = features
            .map((feature, index) => {
                const iconClass = getFeatureIcon(feature);
                const sourceTag = feature.properties?.source === "OpenStreetMap" ? '<span class="source-tag">OSM</span>' : "";
                return `
                    <button class="search-result-item" type="button"
                        data-index="${index}"
                        data-lng="${feature.center[0]}"
                        data-lat="${feature.center[1]}"
                        data-name="${escapeHtml(feature.text || "Result")}">
                        <i class="fas ${iconClass} search-result-icon"></i>
                        <span class="search-result-copy">
                            <div class="search-result-top">
                                <strong>${escapeHtml(feature.text || "Result")}</strong>
                                ${sourceTag}
                            </div>
                            <span>${escapeHtml(feature.place_name || "")}</span>
                        </span>
                    </button>
                `;
            })
            .join("");
        dropdown.style.display = "block";
        meta.textContent = `${features.length} structural & location matches found worldwide.`;

        $$(".search-result-item").forEach((button) => {
            button.addEventListener("click", () => {
                const feature = state.latestSearchResults[Number(button.dataset.index)];
                selectPlaceResult(feature);
                dropdown.style.display = "none";
            });
        });
    } catch (error) {
        console.error(error);
        dropdown.innerHTML = `<div class="search-result-empty">Search temporarily unavailable.</div>`;
        dropdown.style.display = "block";
        meta.textContent = "Global search is temporarily unavailable. Please try again.";
    }
}

function getFeatureIcon(feature) {
    const cls = (feature.properties?.class || feature.properties?.type || "").toLowerCase();
    const txt = (feature.text || feature.place_name || "").toLowerCase();

    if (cls.includes("monument") || txt.includes("monument")) return "fa-monument";
    if (cls.includes("castle") || txt.includes("fort")) return "fa-fort-awesome";
    if (cls.includes("tower") || txt.includes("tower")) return "fa-broadcast-tower";
    if (cls.includes("museum") || cls.includes("gallery")) return "fa-landmark-dome";
    if (cls.includes("stadium") || cls.includes("arena")) return "fa-circle-dot";
    if (cls.includes("bridge")) return "fa-bridge";
    if (cls.includes("industrial") || cls.includes("factory")) return "fa-industry";
    if (cls.includes("office") || cls.includes("commercial")) return "fa-building";
    if (cls.includes("place") || cls.includes("city") || cls.includes("town")) return "fa-city";
    
    return "fa-location-crosshairs";
}

function updateSearchSelection(items) {
    items.forEach((item, index) => {
        item.classList.toggle("active", index === state.activeSearchIndex);
    });
}

function selectPlaceResult(feature) {
    if (!feature) {
        return;
    }

    const lng = Number(feature.center?.[0]);
    const lat = Number(feature.center?.[1]);
    const name = feature.place_name || feature.text || "Selected place";
    const isPOI = feature.properties?.source === "OpenStreetMap" || feature.place_type?.includes("poi") || feature.id?.startsWith("nom-");

    $("#place-search").value = feature.text || name;
    $("#search-meta").textContent = `Mapped: ${name}`;
    setWeatherTarget({
        name: feature.text || "Selected place",
        address: feature.place_name || name,
        area: feature.context?.find(c => c.id.includes("place"))?.text || feature.text || "Mapped area",
        lat,
        lng,
        source: feature.properties?.source || "Map search",
    });

    if (state.mapReady && state.map) {
        const zoom = isPOI ? 18.2 : 15.8;
        if (Array.isArray(feature.bbox) && feature.bbox.length === 4) {
            state.map.fitBounds(
                [
                    [feature.bbox[0], feature.bbox[1]],
                    [feature.bbox[2], feature.bbox[3]],
                ],
                {
                    padding: { top: 120, right: 120, bottom: 120, left: 340 },
                    duration: 1400,
                    maxZoom: zoom,
                }
            );
        } else {
            centerOnCoordinates([lng, lat], zoom);
        }
    }

    addOrMoveMarker([lng, lat]);
    
    // Auto-trigger analysis for POIs
    if (isPOI) {
        setSystemStatus(`Deep scan targeting: ${feature.text}`);
        setTimeout(() => {
            const mockFeature = {
                id: feature.id,
                properties: {
                    name: feature.text,
                    category: feature.properties?.class || feature.properties?.type,
                    source: feature.properties?.source
                }
            };
            analyzeBuilding(mockFeature, { lng, lat });
        }, 1500);
    }

    runResilienceAnalysis({ silent: true });
}

function initUpload() {
    const zone = $("#upload-zone");
    const input = $("#file-input");
    const removeButton = $("#file-remove");

    zone.addEventListener("click", () => input.click());
    zone.addEventListener("dragover", (event) => {
        event.preventDefault();
        zone.classList.add("drag-over");
    });
    zone.addEventListener("dragleave", () => zone.classList.remove("drag-over"));
    zone.addEventListener("drop", (event) => {
        event.preventDefault();
        zone.classList.remove("drag-over");
        if (event.dataTransfer.files?.length) {
            handleFile(event.dataTransfer.files[0]);
        }
    });
    input.addEventListener("change", (event) => {
        if (event.target.files?.length) {
            handleFile(event.target.files[0]);
        }
    });

    removeButton.addEventListener("click", (event) => {
        event.stopPropagation();
        clearFile();
    });
}

function handleFile(file) {
    if (!file?.name?.toLowerCase().endsWith(".csv")) {
        window.alert("Please upload a CSV dataset.");
        return;
    }

    state.selectedFile = file;
    $("#upload-zone").style.display = "none";
    $("#file-badge").style.display = "flex";
    $("#fname").textContent = file.name;
    $("#fsize").textContent = `${(file.size / 1024).toFixed(1)} KB`;
    setSystemStatus(`Dataset ready: ${file.name}`);
}

function clearFile() {
    state.selectedFile = null;
    $("#upload-zone").style.display = "block";
    $("#file-badge").style.display = "none";
    $("#file-input").value = "";
    $("#validation-box").style.display = "none";
    setSystemStatus("Scenario mode active");
}

function initSliders() {
    const sliders = [
        { input: "#sl-eq", output: "#sv-eq", format: (value) => Number(value).toFixed(1) },
        { input: "#sl-temp", output: "#sv-temp", format: (value) => Math.round(Number(value)).toString() },
        { input: "#sl-moist", output: "#sv-moist", format: (value) => Number(value).toFixed(2) },
    ];

    sliders.forEach(({ input, output, format }) => {
        const slider = $(input);
        const label = $(output);
        slider.addEventListener("input", () => {
            label.textContent = format(slider.value);
        });
    });
}

function initAIMode() {
    $$(".ai-btn").forEach((button) => {
        button.addEventListener("click", () => {
            $$(".ai-btn").forEach((item) => item.classList.remove("active"));
            button.classList.add("active");
            state.aiMode = button.dataset.mode;
            if (state.analysisData?.llm_explanation) {
                renderLLMInsights(state.analysisData.llm_explanation);
            }
        });
    });
}

function initAlert() {
    $("#alert-dismiss").addEventListener("click", () => {
        $("#alert-banner").classList.remove("visible");
    });
}

function initDetailPanel() {
    $("#det-close").addEventListener("click", deselectBuilding);
}

function initRightPanel() {
    $$(".right-tab").forEach((button) => {
        button.addEventListener("click", () => {
            switchRightTab(button.dataset.rtab);
            if (state.rightTabTrayExpanded) {
                toggleRightTabTray(false);
            }
        });
    });

    $("#right-panel-toggle")?.addEventListener("click", () => {
        toggleRightPanel(!state.rightPanelCollapsed);
    });
    $("#right-tabs-menu")?.addEventListener("click", () => {
        toggleRightTabTray(!state.rightTabTrayExpanded);
    });
}

function initLeftPanel() {
    $("#left-panel-toggle")?.addEventListener("click", () => {
        toggleLeftPanel(!state.leftPanelCollapsed);
    });
}

function initWeatherPanel() {
    const [lng, lat] = DEFAULT_VIEW.center;
    setWeatherTarget({
        name: "Bengaluru command zone",
        address: "Bengaluru, Karnataka, India",
        area: "Bengaluru",
        lat,
        lng,
        source: "Default command view",
    });

    if (state.weatherInterval) {
        window.clearInterval(state.weatherInterval);
    }
    state.weatherInterval = window.setInterval(() => {
        if (state.weatherTarget) {
            fetchWeatherForTarget(state.weatherTarget, { silent: true });
        }
    }, 300000);
}

async function initSatelliteTelemetry() {
    try {
        const response = await fetch(`${API}/satellites`);
        if (!response.ok) {
            throw new Error(`Failed to fetch satellite data: ${response.statusText}`);
        }
        state.satelliteBlueprints = await response.json();
        state.satellites = state.satelliteBlueprints.map((satellite, index) => buildSatelliteSnapshot(satellite, index, Date.now()));
        state.selectedSatelliteId = state.satellites[0]?.id || null;
        seedTelemetrySeries();
        renderSatelliteTelemetry();

        if (state.satelliteInterval) {
            window.clearInterval(state.satelliteInterval);
        }
        state.satelliteInterval = window.setInterval(() => {
            tickSatelliteTelemetry();
        }, 1400);
    } catch (error) {
        console.error("Error initializing satellite telemetry:", error);
        // You could show an error message to the user here
    }
}

function tickSatelliteTelemetry() {
    const now = Date.now();
    state.satellites = state.satelliteBlueprints.map((satellite, index) => buildSatelliteSnapshot(satellite, index, now));
    pushTelemetryFrame();
    renderSatelliteTelemetry();
}

function seedTelemetrySeries() {
    state.telemetrySeries = {
        labels: [],
        satelliteHealth: [],
        networkHealth: [],
        trafficFlow: [],
    };

    for (let index = 11; index >= 0; index -= 1) {
        pushTelemetryFrame(Date.now() - index * 1400);
    }
}

function pushTelemetryFrame(timestamp = Date.now()) {
    if (!state.satellites.length) {
        return;
    }

    const series = state.telemetrySeries;
    const selectedSatellite = state.satellites.find((item) => item.id === state.selectedSatelliteId) || state.satellites[0];
    const phase = timestamp / 1000;
    const burstFactor = Math.max(0, Math.sin(phase * 0.17 + 1.2)) * 7.5;
    const meshNoise = Math.sin(phase * 0.93) * 2.4 + Math.cos(phase * 0.41) * 1.8;
    const avgHealth = clampNumber(
        averageBy(state.satellites, (satellite) => satellite.healthPct) - Math.max(0, Math.sin(phase * 0.21)) * 2.1 + meshNoise * 0.25,
        82,
        100
    );
    const networkHealth = clampNumber(
        100 - averageBy(state.satellites, (satellite) => satellite.packetLossPct) * 18 - averageBy(state.satellites, (satellite) => satellite.anomalyRisk) * 55 - burstFactor * 0.35 + meshNoise,
        52,
        100
    );
    const trafficFlow = clampNumber(
        averageBy(state.satellites, (satellite) => satellite.downlinkMbps) * 0.14 +
            (state.selectedBuilding ? 22 : 8) +
            (selectedSatellite?.status === "critical" ? -10 : selectedSatellite?.status === "warning" ? -4 : 4) +
            burstFactor * 1.4 +
            Math.max(0, Math.sin(phase * 0.48)) * 12,
        20,
        140
    );

    series.labels.push(formatTelemetryTime(timestamp));
    series.satelliteHealth.push(roundValue(avgHealth, 1));
    series.networkHealth.push(roundValue(networkHealth, 1));
    series.trafficFlow.push(roundValue(trafficFlow, 1));

    const maxPoints = 24;
    Object.keys(series).forEach((key) => {
        if (series[key].length > maxPoints) {
            series[key] = series[key].slice(-maxPoints);
        }
    });
}

function buildSatelliteSnapshot(blueprint, index, timestamp) {
    const phase = timestamp / 1000 + index * 1.73;
    const healthPct = clampNumber(blueprint.healthPct + Math.sin(phase * 0.31) * 0.9, 86, 100);
    const coveragePct = clampNumber(blueprint.coveragePct + Math.cos(phase * 0.22) * 2.2, 72, 100);
    const latencyMs = clampNumber(blueprint.latencyMs + Math.sin(phase * 0.57) * 9, 90, 240);
    const downlinkMbps = clampNumber(blueprint.downlinkMbps + Math.cos(phase * 0.43) * 28, 240, 760);
    const powerPct = clampNumber(blueprint.powerPct + Math.sin(phase * 0.26) * 2.4, 58, 100);
    const thermalC = clampNumber(blueprint.thermalC + Math.cos(phase * 0.51) * 3.1, -12, 42);
    const signalDbm = clampNumber(blueprint.signalDbm + Math.sin(phase * 0.61) * 2.1, -84, -48);
    const packetLossPct = clampNumber(blueprint.packetLossPct + Math.abs(Math.cos(phase * 0.48)) * 0.18, 0.05, 2.4);
    const anomalyRisk = clampNumber(blueprint.anomalyRisk + Math.abs(Math.sin(phase * 0.33)) * 0.08, 0.03, 0.68);
    const passProgress = ((phase * 7.2) % 100 + 100) % 100;

    let status = "nominal";
    if (healthPct < 90 || anomalyRisk > 0.32 || packetLossPct > 1.0) {
        status = "warning";
    }
    if (healthPct < 87 || anomalyRisk > 0.48 || packetLossPct > 1.5) {
        status = "critical";
    }

    return {
        ...blueprint,
        healthPct,
        coveragePct,
        latencyMs,
        downlinkMbps,
        powerPct,
        thermalC,
        signalDbm,
        packetLossPct,
        anomalyRisk,
        passProgress,
        status,
        nextPassMinutes: Math.max(2, Math.round(18 + index * 4 + (100 - passProgress) * 0.22)),
        uplinkLock: status === "critical" ? "Degraded" : status === "warning" ? "Conditional" : "Locked",
    };
}

function renderSatelliteTelemetry() {
    renderSatelliteHero();
    renderSatelliteCharts();
    renderSatelliteRadar();
    renderSatelliteList();
    renderSatelliteDetail();
}

function renderSatelliteHero() {
    const node = $("#satellite-hero-metrics");
    if (!node || !state.satellites.length) {
        return;
    }

    const nominal = state.satellites.filter((satellite) => satellite.status === "nominal").length;
    const coverage = averageBy(state.satellites, (satellite) => satellite.coveragePct).toFixed(1);
    const latency = Math.round(averageBy(state.satellites, (satellite) => satellite.latencyMs));

    node.innerHTML = `
        ${renderSatelliteHeroChip("Active nodes", `${state.satellites.length}`)}
        ${renderSatelliteHeroChip("Nominal", `${nominal}/${state.satellites.length}`)}
        ${renderSatelliteHeroChip("Coverage", `${coverage}%`)}
        ${renderSatelliteHeroChip("Latency", `${latency} ms`)}
        ${renderSatelliteHeroChip("Scan queue", `${state.selectedBuilding ? "Hot" : "Standby"}`)}
        ${renderSatelliteHeroChip("Telemetry", "Live")}
    `;
}

function renderSatelliteHeroChip(label, value) {
    return `
        <div class="sat-hero-chip">
            <span class="sat-hero-chip-label">${escapeHtml(label)}</span>
            <span class="sat-hero-chip-value">${escapeHtml(value)}</span>
        </div>
    `;
}

function renderSatelliteRadar() {
    const node = $("#satellite-radar");
    if (!node) {
        return;
    }

    node.innerHTML = state.satellites.map((satellite) => `
        <div
            class="sat-orbit-node ${satellite.status}"
            title="${escapeHtml(satellite.name)}"
            style="left:${satellite.orbitalSlot.x}%; top:${satellite.orbitalSlot.y}%;"
        ></div>
    `).join("");
}

function renderSatelliteList() {
    const node = $("#satellite-list");
    if (!node) {
        return;
    }

    node.innerHTML = state.satellites.map((satellite) => `
        <button class="sat-item ${satellite.id === state.selectedSatelliteId ? "active expanded" : ""}" type="button" data-satellite-id="${satellite.id}">
            <div class="sat-item-head">
                <span class="sat-item-title">${escapeHtml(satellite.name)}</span>
                <span class="sat-status ${satellite.status}">${escapeHtml(satellite.status)}</span>
            </div>
            <div class="mini-note">${escapeHtml(satellite.mission)}</div>
            <div class="sat-item-meta">
                <div>
                    <span class="sat-item-metric-label">Coverage</span>
                    <span class="sat-item-metric-value">${satellite.coveragePct.toFixed(1)}%</span>
                </div>
                <div>
                    <span class="sat-item-metric-label">Latency</span>
                    <span class="sat-item-metric-value">${Math.round(satellite.latencyMs)} ms</span>
                </div>
                <div>
                    <span class="sat-item-metric-label">Health</span>
                    <span class="sat-item-metric-value">${satellite.healthPct.toFixed(1)}%</span>
                </div>
            </div>
            <div class="sat-item-expanded">
                <div class="sat-item-expanded-grid">
                    <div>
                        <span class="sat-item-metric-label">Beam target</span>
                        <span class="sat-item-metric-value">${escapeHtml(satellite.beamTarget)}</span>
                    </div>
                    <div>
                        <span class="sat-item-metric-label">Downlink</span>
                        <span class="sat-item-metric-value">${satellite.downlinkMbps.toFixed(0)} Mbps</span>
                    </div>
                    <div>
                        <span class="sat-item-metric-label">Next pass</span>
                        <span class="sat-item-metric-value">${satellite.nextPassMinutes} min</span>
                    </div>
                    <div>
                        <span class="sat-item-metric-label">Uplink lock</span>
                        <span class="sat-item-metric-value">${escapeHtml(satellite.uplinkLock)}</span>
                    </div>
                </div>
                <div class="sat-item-advisory">${escapeHtml(satellite.advisory)}</div>
            </div>
        </button>
    `).join("");

    $$(".sat-item").forEach((button) => {
        button.addEventListener("click", () => {
            state.selectedSatelliteId = button.dataset.satelliteId;
            renderSatelliteList();
            renderSatelliteDetail();
        });
    });

    const activeItem = node.querySelector(".sat-item.expanded");
    if (activeItem) {
        window.requestAnimationFrame(() => {
            activeItem.scrollIntoView({ block: "nearest", behavior: "smooth" });
        });
    }
}

function renderSatelliteDetail() {
    const node = $("#satellite-detail");
    if (!node) {
        return;
    }

    const satellite = state.satellites.find((item) => item.id === state.selectedSatelliteId) || state.satellites[0];
    if (!satellite) {
        node.innerHTML = `<div class="right-empty"><div><i class="fas fa-satellite"></i><p>No satellite telemetry available.</p></div></div>`;
        return;
    }

    const selectedBuildingLine = state.selectedBuilding
        ? `${state.selectedBuilding.lngLat.lat.toFixed(4)}, ${state.selectedBuilding.lngLat.lng.toFixed(4)}`
        : "No active building scan target";

    node.innerHTML = `
        <div class="sat-detail-head">
            <div>
                <div class="sat-detail-title">${escapeHtml(satellite.name)}</div>
                <div class="sat-detail-sub">${escapeHtml(satellite.orbitClass)} · ${escapeHtml(satellite.mission)}</div>
            </div>
            <span class="sat-status ${satellite.status}">${escapeHtml(satellite.status)}</span>
        </div>
        <div class="sat-detail-grid">
            ${renderSatelliteDetailCard("Beam target", satellite.beamTarget)}
            ${renderSatelliteDetailCard("Health", `${satellite.healthPct.toFixed(1)}%`)}
            ${renderSatelliteDetailCard("Altitude", `${satellite.altitudeKm.toFixed(0)} km`)}
            ${renderSatelliteDetailCard("Velocity", `${satellite.velocityKps.toFixed(2)} km/s`)}
            ${renderSatelliteDetailCard("Downlink", `${satellite.downlinkMbps.toFixed(0)} Mbps`)}
            ${renderSatelliteDetailCard("Latency", `${Math.round(satellite.latencyMs)} ms`)}
            ${renderSatelliteDetailCard("Power reserve", `${satellite.powerPct.toFixed(1)}%`)}
            ${renderSatelliteDetailCard("Thermal state", `${satellite.thermalC.toFixed(1)} °C`)}
            ${renderSatelliteDetailCard("Signal", `${satellite.signalDbm.toFixed(1)} dBm`)}
            ${renderSatelliteDetailCard("Packet loss", `${satellite.packetLossPct.toFixed(2)}%`)}
            ${renderSatelliteDetailCard("Coverage", `${satellite.coveragePct.toFixed(1)}%`)}
            ${renderSatelliteDetailCard("Next pass", `${satellite.nextPassMinutes} min`)}
            ${renderSatelliteDetailCard("Uplink lock", satellite.uplinkLock)}
            ${renderSatelliteDetailCard("Anomaly risk", `${(satellite.anomalyRisk * 100).toFixed(1)}%`)}
            ${renderSatelliteDetailCard("Inclination", `${satellite.inclinationDeg.toFixed(1)}°`)}
            ${renderSatelliteDetailCard("Building scan target", selectedBuildingLine)}
        </div>
        <div class="sat-detail-section">
            <div class="sat-detail-section-title">Mission advisory</div>
            <div class="sat-detail-text">${escapeHtml(satellite.advisory)}</div>
        </div>
        <div class="sat-detail-section">
            <div class="sat-detail-section-title">Pass progress</div>
            <div class="sat-detail-text">Current orbital pass is ${satellite.passProgress.toFixed(0)}% complete with telemetry uplink ${escapeHtml(satellite.uplinkLock.toLowerCase())} for StructureX ground control.</div>
        </div>
    `;
}

function renderSatelliteCharts() {
    if (!window.Plotly) {
        return;
    }

    const { labels, satelliteHealth, networkHealth, trafficFlow } = state.telemetrySeries;
    if (!labels.length) {
        return;
    }

    renderSystemStatusChart(labels, satelliteHealth, networkHealth);
    renderNetworkHealthChart(labels, networkHealth);
    renderTrafficFlowChart(labels, trafficFlow);

    const latestHealth = satelliteHealth[satelliteHealth.length - 1];
    const latestNetwork = networkHealth[networkHealth.length - 1];
    const latestTraffic = trafficFlow[trafficFlow.length - 1];
    $("#sat-health-status").textContent = latestHealth >= 94 ? "ACTIVE" : latestHealth >= 88 ? "WATCH" : "DEGRADED";
    $("#sat-network-status").textContent = `${latestNetwork.toFixed(1)}%`;
    $("#sat-traffic-status").textContent = `${latestTraffic >= 90 ? "HIGH" : latestTraffic >= 62 ? "ELEVATED" : "STABLE"} (${Math.round(latestTraffic * 142)} /hr)`;
}

function renderSystemStatusChart(labels, satelliteHealth, networkHealth) {
    const subsystemLoad = satelliteHealth.map((value, index) =>
        roundValue((value * 0.56 + networkHealth[index] * 0.44) - 8 + Math.sin(index * 0.6) * 5, 1)
    );
    const latestLabel = labels[labels.length - 1];
    const latestHealth = satelliteHealth[satelliteHealth.length - 1];
    const latestSubsystem = subsystemLoad[subsystemLoad.length - 1];

    Plotly.react(
        "satellite-chart-health",
        [
            {
                type: "scatter",
                mode: "lines",
                x: labels,
                y: satelliteHealth,
                line: { color: "#57e3ff", width: 2.8, shape: "spline", smoothing: 0.9 },
                fill: "tozeroy",
                fillcolor: "rgba(87,227,255,0.24)",
                hovertemplate: "System health: %{y:.1f}%<extra></extra>",
            },
            {
                type: "scatter",
                mode: "markers",
                x: [latestLabel],
                y: [latestHealth],
                marker: { color: "#8df4ff", size: 9, line: { color: "#ffffff", width: 1 } },
                hovertemplate: "Live health: %{y:.1f}%<extra></extra>",
            },
            {
                type: "scatter",
                mode: "lines",
                x: labels,
                y: subsystemLoad,
                line: { color: "#b06cff", width: 2.2, shape: "spline", smoothing: 0.9 },
                fill: "tonexty",
                fillcolor: "rgba(176,108,255,0.14)",
                hovertemplate: "Subsystem load: %{y:.1f}%<extra></extra>",
            },
            {
                type: "scatter",
                mode: "markers",
                x: [latestLabel],
                y: [latestSubsystem],
                marker: { color: "#d8b4fe", size: 7 },
                hovertemplate: "Subsystem live: %{y:.1f}%<extra></extra>",
            },
        ],
        buildTelemetryChartLayout({
            yaxisTitle: "%",
            range: [0, 100],
            transitionMs: 700,
            shapes: [
                {
                    type: "line",
                    xref: "paper",
                    x0: 0,
                    x1: 1,
                    y0: 85,
                    y1: 85,
                    line: { color: "rgba(87,227,255,0.18)", width: 1, dash: "dot" },
                },
            ],
        }),
        { responsive: true, displayModeBar: false }
    );
}

function renderNetworkHealthChart(labels, networkHealth) {
    const realTimeMesh = networkHealth.map((value, index) =>
        roundValue(value - 6 + Math.sin(index * 0.82) * 4.4, 1)
    );
    const latestLabel = labels[labels.length - 1];
    const latestNetwork = networkHealth[networkHealth.length - 1];

    Plotly.react(
        "satellite-chart-network",
        [
            {
                type: "scatter",
                mode: "lines",
                x: labels,
                y: realTimeMesh,
                line: { color: "#9a6cff", width: 1.8, shape: "spline", smoothing: 0.8 },
                hovertemplate: "Real-time mesh: %{y:.1f}%<extra></extra>",
            },
            {
                type: "scatter",
                mode: "lines",
                x: labels,
                y: networkHealth,
                line: { color: "#57e3ff", width: 2.6, shape: "spline", smoothing: 0.9 },
                fill: "tozeroy",
                fillcolor: "rgba(87,227,255,0.18)",
                hovertemplate: "Network health: %{y:.1f}%<extra></extra>",
            },
            {
                type: "scatter",
                mode: "markers",
                x: [latestLabel],
                y: [latestNetwork],
                marker: { color: "#8df4ff", size: 8, line: { color: "#ffffff", width: 1 } },
                hovertemplate: "Network live: %{y:.1f}%<extra></extra>",
            },
        ],
        buildTelemetryChartLayout({
            yaxisTitle: "%",
            range: [0, 100],
            transitionMs: 650,
            annotations: [
                {
                    x: 0.02,
                    y: 1.1,
                    xref: "paper",
                    yref: "paper",
                    text: "REAL TIME HEALTH",
                    showarrow: false,
                    font: { size: 9, color: "#c8d6e5" },
                    xanchor: "left",
                },
                {
                    x: 0.98,
                    y: 1.1,
                    xref: "paper",
                    yref: "paper",
                    text: "Real-time",
                    showarrow: false,
                    font: { size: 9, color: "#57e3ff" },
                    xanchor: "right",
                },
            ],
            shapes: [
                {
                    type: "rect",
                    xref: "paper",
                    yref: "y",
                    x0: 0,
                    x1: 1,
                    y0: 92,
                    y1: 100,
                    fillcolor: "rgba(87,227,255,0.06)",
                    line: { width: 0 },
                },
            ],
        }),
        { responsive: true, displayModeBar: false }
    );
}

function renderTrafficFlowChart(labels, trafficFlow) {
    const recent = trafficFlow.slice(-10);
    const xTicks = labels.slice(-recent.length);
    const heatmap = buildTrafficHeatmap(recent);
    const latestTraffic = recent[recent.length - 1];

    Plotly.react(
        "satellite-chart-traffic",
        [
            {
                type: "heatmap",
                z: heatmap,
                x: recent.map((_, index) => index + 1),
                y: ["L6", "L5", "L4", "L3", "L2", "L1"],
                xaxis: "x",
                yaxis: "y",
                colorscale: [
                    [0, "#1b2560"],
                    [0.18, "#3550d8"],
                    [0.38, "#3fc5ff"],
                    [0.58, "#7df0c8"],
                    [0.78, "#ff8b5e"],
                    [1, "#ef4444"],
                ],
                showscale: false,
                hovertemplate: "Traffic intensity: %{z:.1f}<extra></extra>",
            },
            {
                type: "bar",
                x: xTicks,
                y: recent.map((value) => Math.round(value * 22)),
                xaxis: "x2",
                yaxis: "y2",
                marker: {
                    color: recent.map((value) => value > 92 ? "#ef4444" : value > 72 ? "#57e3ff" : "#3550d8"),
                },
                hovertemplate: "Traffic volume: %{y} units<extra></extra>",
            },
        ],
        {
            paper_bgcolor: "rgba(0,0,0,0)",
            plot_bgcolor: "rgba(0,0,0,0)",
            margin: { t: 8, r: 10, b: 24, l: 28 },
            font: {
                family: "'Inter', sans-serif",
                color: THEME.text,
                size: 10,
            },
            transition: { duration: 700, easing: "cubic-in-out" },
            annotations: [
                {
                    x: 0.98,
                    y: 1.1,
                    xref: "paper",
                    yref: "paper",
                    text: `Live ${Math.round(latestTraffic * 22)} units`,
                    showarrow: false,
                    font: { size: 9, color: latestTraffic > 92 ? "#fca5a5" : "#57e3ff" },
                    xanchor: "right",
                },
            ],
            xaxis: {
                domain: [0, 1],
                anchor: "y",
                showticklabels: false,
                showgrid: false,
                zeroline: false,
                fixedrange: true,
            },
            yaxis: {
                domain: [0.46, 1],
                showgrid: false,
                zeroline: false,
                tickfont: { size: 8, color: "#94a3b8" },
                fixedrange: true,
            },
            xaxis2: {
                domain: [0, 1],
                anchor: "y2",
                tickfont: { size: 8, color: THEME.muted },
                showgrid: false,
                zeroline: false,
                fixedrange: true,
            },
            yaxis2: {
                domain: [0, 0.28],
                tickfont: { size: 8, color: THEME.muted },
                gridcolor: "rgba(255,255,255,0.05)",
                zerolinecolor: "rgba(255,255,255,0.05)",
                fixedrange: true,
            },
        },
        { responsive: true, displayModeBar: false }
    );
}

function buildTrafficHeatmap(recent) {
    const rows = 6;
    return Array.from({ length: rows }, (_, rowIndex) =>
        recent.map((value, columnIndex) =>
            roundValue(
                clampNumber(
                    value * (0.62 + rowIndex * 0.12) +
                        Math.sin((rowIndex + 1) * (columnIndex + 1) * 0.8) * 8,
                    18,
                    100
                ),
                1
            )
        )
    );
}

function buildTelemetryChartLayout({ yaxisTitle, range, transitionMs = 600, annotations = [], shapes = [] }) {
    return {
        paper_bgcolor: "rgba(0,0,0,0)",
        plot_bgcolor: "rgba(0,0,0,0)",
        margin: { t: 10, r: 12, b: 24, l: 30 },
        showlegend: false,
        transition: { duration: transitionMs, easing: "cubic-in-out" },
        hovermode: "x unified",
        hoverlabel: {
            bgcolor: "rgba(7, 14, 28, 0.96)",
            bordercolor: "rgba(87,227,255,0.24)",
            font: { family: "'Inter', sans-serif", size: 10, color: "#f8fafc" },
        },
        font: {
            family: "'Inter', sans-serif",
            color: THEME.text,
            size: 10,
        },
        xaxis: {
            color: THEME.muted,
            gridcolor: "rgba(255,255,255,0.05)",
            zerolinecolor: "rgba(255,255,255,0.05)",
            tickfont: { size: 8 },
            fixedrange: true,
            showspikes: true,
            spikemode: "across",
            spikecolor: "rgba(87,227,255,0.22)",
            spikethickness: 1,
        },
        yaxis: {
            title: yaxisTitle,
            color: THEME.muted,
            gridcolor: "rgba(255,255,255,0.05)",
            zerolinecolor: "rgba(255,255,255,0.05)",
            range,
            fixedrange: true,
            showspikes: true,
            spikecolor: "rgba(87,227,255,0.18)",
        },
        annotations,
        shapes,
    };
}

function renderSatelliteDetailCard(label, value) {
    return `
        <div class="sat-detail-card">
            <span class="sat-detail-card-label">${escapeHtml(label)}</span>
            <span class="sat-detail-card-value">${escapeHtml(String(value))}</span>
        </div>
    `;
}

function averageBy(items, selector) {
    if (!items.length) {
        return 0;
    }
    return items.reduce((total, item) => total + selector(item), 0) / items.length;
}

function setWeatherTarget(target) {
    if (target?.lat === undefined || target?.lng === undefined || target?.lat === null || target?.lng === null) {
        return;
    }

    const normalized = {
        name: target.name || target.area || "Selected area",
        address: target.address || target.name || "Selected area",
        area: target.area || target.name || "Selected area",
        lat: Number(target.lat),
        lng: Number(target.lng),
        source: target.source || "Map target",
    };

    const current = state.weatherTarget;
    const changed = !current ||
        Math.abs(current.lat - normalized.lat) > 0.0001 ||
        Math.abs(current.lng - normalized.lng) > 0.0001 ||
        current.address !== normalized.address;

    state.weatherTarget = normalized;
    if (changed) {
        state.weatherData = null;
    }
    renderWeatherPanel();

    if (changed) {
        fetchWeatherForTarget(normalized);
    }
}

async function fetchWeatherForTarget(target, options = {}) {
    if (!target) {
        return;
    }

    state.activeWeatherRequestId += 1;
    const requestId = state.activeWeatherRequestId;
    state.weatherLoading = true;
    if (!options.silent) {
        renderWeatherPanel();
    }

    const url = new URL("https://api.open-meteo.com/v1/forecast");
    url.searchParams.set("latitude", String(target.lat));
    url.searchParams.set("longitude", String(target.lng));
    url.searchParams.set(
        "current",
        [
            "temperature_2m",
            "relative_humidity_2m",
            "apparent_temperature",
            "precipitation",
            "weather_code",
            "wind_speed_10m",
            "wind_direction_10m",
            "wind_gusts_10m",
            "surface_pressure",
            "pressure_msl",
            "cloud_cover",
            "visibility",
        ].join(",")
    );
    url.searchParams.set(
        "hourly",
        [
            "temperature_2m",
            "relative_humidity_2m",
            "precipitation_probability",
            "wind_speed_10m",
            "cloud_cover",
        ].join(",")
    );
    url.searchParams.set("forecast_hours", "24");
    url.searchParams.set("timezone", "auto");

    try {
        const response = await fetch(url.toString());
        if (!response.ok) {
            throw new Error(`Weather request failed (${response.status})`);
        }

        const payload = await response.json();
        if (requestId !== state.activeWeatherRequestId) {
            return;
        }

        state.weatherData = {
            target,
            payload,
            fetchedAt: Date.now(),
        };
        state.weatherLoading = false;
        renderWeatherPanel();
    } catch (error) {
        if (requestId !== state.activeWeatherRequestId) {
            return;
        }
        console.error(error);
        state.weatherLoading = false;
        state.weatherData = {
            target,
            error: error.message,
            fetchedAt: Date.now(),
        };
        renderWeatherPanel();
    }
}

function renderWeatherPanel() {
    const targetLabel = $("#weather-target-label");
    const currentNode = $("#weather-current");
    const gridNode = $("#weather-grid");
    const footnoteNode = $("#weather-footnote");
    if (!targetLabel || !currentNode || !gridNode || !footnoteNode) {
        return;
    }

    const target = state.weatherTarget;
    targetLabel.textContent = target
        ? `${target.address} · ${target.lat.toFixed(4)}, ${target.lng.toFixed(4)}`
        : "Awaiting location target...";

    if (!target) {
        currentNode.innerHTML = `<div class="right-empty"><div><i class="fas fa-cloud-sun"></i><p>Select a place or building to retrieve live weather.</p></div></div>`;
        gridNode.innerHTML = "";
        footnoteNode.innerHTML = "";
        return;
    }

    if (state.weatherLoading && !state.weatherData) {
        currentNode.innerHTML = `<div class="weather-loading">Fetching live conditions for ${escapeHtml(target.area)}...</div>`;
        gridNode.innerHTML = "";
        footnoteNode.innerHTML = "";
        return;
    }

    if (state.weatherData?.error) {
        currentNode.innerHTML = `<div class="weather-loading">Live weather is temporarily unavailable for ${escapeHtml(target.area)}.</div>`;
        gridNode.innerHTML = "";
        footnoteNode.innerHTML = `<div class="weather-footnote-text">Source request failed: ${escapeHtml(state.weatherData.error)}</div>`;
        return;
    }

    const payload = state.weatherData?.payload;
    const current = payload?.current;
    const hourly = payload?.hourly;
    if (!current || !hourly) {
        currentNode.innerHTML = `<div class="weather-loading">Waiting for live weather feed...</div>`;
        gridNode.innerHTML = "";
        footnoteNode.innerHTML = "";
        return;
    }

    const weatherLabel = weatherCodeToLabel(current.weather_code);
    const observedTime = formatTimestamp(current.time, payload.timezone_abbreviation || payload.timezone);
    currentNode.innerHTML = `
        <div class="weather-current-main">
            <div>
                <div class="weather-current-label">Current conditions</div>
                <div class="weather-current-temp">${Number(current.temperature_2m).toFixed(1)}°C</div>
                <div class="weather-current-desc">${escapeHtml(weatherLabel)} · feels like ${Number(current.apparent_temperature).toFixed(1)}°C</div>
            </div>
            <div class="weather-current-meta">
                <span class="weather-meta-chip">${escapeHtml(target.source)}</span>
                <span class="weather-meta-chip">Observed ${escapeHtml(observedTime)}</span>
            </div>
        </div>
    `;

    const detailCards = [
        ["Humidity", `${Number(current.relative_humidity_2m).toFixed(0)}%`],
        ["Wind speed", `${Number(current.wind_speed_10m).toFixed(1)} km/h`],
        ["Wind gusts", `${Number(current.wind_gusts_10m).toFixed(1)} km/h`],
        ["Wind direction", formatWindDirection(current.wind_direction_10m)],
        ["Pressure", `${Number(current.pressure_msl || current.surface_pressure).toFixed(0)} hPa`],
        ["Cloud cover", `${Number(current.cloud_cover).toFixed(0)}%`],
        ["Visibility", `${(Number(current.visibility) / 1000).toFixed(1)} km`],
        ["Precipitation", `${Number(current.precipitation).toFixed(1)} mm`],
    ];

    gridNode.innerHTML = detailCards.map(([label, value]) => `
        <div class="weather-card glass">
            <span class="weather-card-label">${escapeHtml(label)}</span>
            <span class="weather-card-value">${escapeHtml(value)}</span>
        </div>
    `).join("");

    footnoteNode.innerHTML = `
        <div class="weather-footnote-text">
            Live weather source: Open-Meteo forecast/current feed. Target timezone: ${escapeHtml(payload.timezone || "auto")}. Elevation: ${Number(payload.elevation || 0).toFixed(0)} m.
        </div>
    `;
    updatedNode.textContent = `Updated ${formatRelativeTime(state.weatherData.fetchedAt)}`;

    renderWeatherChart(hourly);
}

function renderWeatherChart(hourly) {
    if (!window.Plotly) {
        return;
    }

    const times = (hourly.time || []).slice(0, 24).map((value) => formatHourLabel(value));
    const temp = (hourly.temperature_2m || []).slice(0, 24);
    const wind = (hourly.wind_speed_10m || []).slice(0, 24);
    const precip = (hourly.precipitation_probability || []).slice(0, 24);

    Plotly.react(
        "weather-chart-hourly",
        [
            {
                type: "scatter",
                mode: "lines",
                x: times,
                y: temp,
                name: "Temp",
                line: { color: "#3b82f6", width: 2.4 },
                hovertemplate: "Temp: %{y:.1f}°C<extra></extra>",
            },
            {
                type: "scatter",
                mode: "lines",
                x: times,
                y: wind,
                name: "Wind",
                line: { color: "#cbd5e1", width: 2, dash: "dot" },
                yaxis: "y2",
                hovertemplate: "Wind: %{y:.1f} km/h<extra></extra>",
            },
            {
                type: "bar",
                x: times,
                y: precip,
                name: "Precip %",
                marker: { color: "rgba(96,165,250,0.3)" },
                opacity: 0.72,
                yaxis: "y3",
                hovertemplate: "Precip probability: %{y:.0f}%<extra></extra>",
            },
        ],
        {
            ...buildMiniChartLayout(),
            margin: { t: 8, r: 42, b: 32, l: 36 },
            barmode: "overlay",
            legend: {
                orientation: "h",
                x: 0,
                y: 1.18,
                font: { family: "'Inter', sans-serif", size: 10, color: THEME.text },
            },
            yaxis: {
                title: "°C",
                color: THEME.muted,
                gridcolor: THEME.grid,
                zerolinecolor: THEME.grid,
            },
            yaxis2: {
                title: "km/h",
                overlaying: "y",
                side: "right",
                color: THEME.muted,
            },
            yaxis3: {
                overlaying: "y",
                side: "right",
                position: 0.96,
                range: [0, 100],
                showgrid: false,
                showticklabels: false,
            },
        },
        { responsive: true, displayModeBar: false }
    );
}

function renderMiniTelemetryChart(containerId, config) {
    if (!window.Plotly) {
        return;
    }

    Plotly.react(
        containerId,
        [
            {
                type: "scatter",
                mode: "lines",
                x: config.x,
                y: config.y,
                line: {
                    color: config.color,
                    width: 2.3,
                    shape: "spline",
                    smoothing: 0.8,
                },
                fill: "tozeroy",
                fillcolor: config.fill,
                hovertemplate: `${config.label}: %{y:.1f}${config.suffix}<extra></extra>`,
            },
        ],
        {
            ...buildMiniChartLayout(),
            yaxis: {
                title: config.yaxisTitle,
                color: THEME.muted,
                gridcolor: THEME.grid,
                zerolinecolor: THEME.grid,
            },
        },
        { responsive: true, displayModeBar: false }
    );
}

function renderWeatherPanel() {
    const targetLabel = $("#weather-target-label");
    const currentNode = $("#weather-current");
    const gridNode = $("#weather-grid");
    const footnoteNode = $("#weather-footnote");
    if (!targetLabel || !currentNode || !gridNode || !footnoteNode) {
        return;
    }

    const target = state.weatherTarget;
    targetLabel.textContent = target
        ? `${target.address} · ${target.lat.toFixed(4)}, ${target.lng.toFixed(4)}`
        : "Awaiting location target...";

    if (!target) {
        currentNode.innerHTML = `<div class="right-empty"><div><i class="fas fa-cloud-sun"></i><p>Select a place or building to retrieve live weather.</p></div></div>`;
        gridNode.innerHTML = "";
        footnoteNode.innerHTML = "";
        return;
    }

    if (state.weatherLoading && !state.weatherData) {
        currentNode.innerHTML = `<div class="weather-loading">Fetching live conditions for ${escapeHtml(target.area)}...</div>`;
        gridNode.innerHTML = "";
        footnoteNode.innerHTML = "";
        return;
    }

    if (state.weatherData?.error) {
        currentNode.innerHTML = `<div class="weather-loading">Live weather is temporarily unavailable for ${escapeHtml(target.area)}.</div>`;
        gridNode.innerHTML = "";
        footnoteNode.innerHTML = `<div class="weather-footnote-text">Source request failed: ${escapeHtml(state.weatherData.error)}</div>`;
        return;
    }

    const payload = state.weatherData?.payload;
    const current = payload?.current;
    if (!current) {
        currentNode.innerHTML = `<div class="weather-loading">Waiting for live weather feed...</div>`;
        gridNode.innerHTML = "";
        footnoteNode.innerHTML = "";
        return;
    }

    const weatherLabel = weatherCodeToLabel(current.weather_code);
    const observedTime = formatTimestamp(current.time, payload.timezone_abbreviation || payload.timezone);
    currentNode.innerHTML = `
        <div class="weather-current-main">
            <div>
                <div class="weather-current-label">Current conditions</div>
                <div class="weather-current-temp">${Number(current.temperature_2m).toFixed(1)}°C</div>
                <div class="weather-current-desc">${escapeHtml(weatherLabel)} · feels like ${Number(current.apparent_temperature).toFixed(1)}°C</div>
            </div>
            <div class="weather-current-meta">
                <span class="weather-meta-chip">${escapeHtml(target.source)}</span>
                <span class="weather-meta-chip">Observed ${escapeHtml(observedTime)}</span>
            </div>
        </div>
    `;

    const detailCards = [
        ["Humidity", `${Number(current.relative_humidity_2m).toFixed(0)}%`],
        ["Wind speed", `${Number(current.wind_speed_10m).toFixed(1)} km/h`],
        ["Wind gusts", `${Number(current.wind_gusts_10m).toFixed(1)} km/h`],
        ["Wind direction", formatWindDirection(current.wind_direction_10m)],
        ["Pressure", `${Number(current.pressure_msl || current.surface_pressure).toFixed(0)} hPa`],
        ["Cloud cover", `${Number(current.cloud_cover).toFixed(0)}%`],
        ["Visibility", `${(Number(current.visibility) / 1000).toFixed(1)} km`],
        ["Precipitation", `${Number(current.precipitation).toFixed(1)} mm`],
    ];

    gridNode.innerHTML = detailCards.map(([label, value]) => `
        <div class="weather-card glass">
            <span class="weather-card-label">${escapeHtml(label)}</span>
            <span class="weather-card-value">${escapeHtml(value)}</span>
        </div>
    `).join("");

    footnoteNode.innerHTML = `
        <div class="weather-footnote-text">
            Live weather source: Open-Meteo forecast/current feed. Target timezone: ${escapeHtml(payload.timezone || "auto")}. Elevation: ${Number(payload.elevation || 0).toFixed(0)} m. Last updated ${escapeHtml(formatRelativeTime(state.weatherData.fetchedAt))}.
        </div>
    `;
}

function buildMiniChartLayout() {
    return {
        paper_bgcolor: "rgba(0,0,0,0)",
        plot_bgcolor: "rgba(0,0,0,0)",
        margin: { t: 8, r: 12, b: 26, l: 36 },
        showlegend: false,
        font: {
            family: "'Inter', sans-serif",
            color: THEME.text,
            size: 10,
        },
        xaxis: {
            color: THEME.muted,
            gridcolor: THEME.grid,
            zerolinecolor: THEME.grid,
            tickfont: { size: 9 },
        },
    };
}

function renderEmptyPlot(containerId, message) {
    const node = document.getElementById(containerId);
    if (!node) {
        return;
    }
    if (window.Plotly && node.data) {
        Plotly.purge(node);
    }
    node.innerHTML = `<div class="chart-empty">${escapeHtml(message)}</div>`;
}

function roundValue(value, digits = 1) {
    return Number(Number(value).toFixed(digits));
}

function formatTelemetryTime(timestamp) {
    return new Date(timestamp).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });
}

function formatHourLabel(value) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
        return String(value).slice(11, 16);
    }
    return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });
}

function formatTimestamp(value, timezone) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
        return String(value);
    }
    const local = date.toLocaleString([], {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
    return timezone ? `${local} ${timezone}` : local;
}

function formatRelativeTime(timestamp) {
    if (!timestamp) {
        return "just now";
    }
    const diffSeconds = Math.max(0, Math.round((Date.now() - timestamp) / 1000));
    if (diffSeconds < 60) {
        return `${diffSeconds}s ago`;
    }
    const diffMinutes = Math.round(diffSeconds / 60);
    if (diffMinutes < 60) {
        return `${diffMinutes}m ago`;
    }
    const diffHours = Math.round(diffMinutes / 60);
    return `${diffHours}h ago`;
}

function weatherCodeToLabel(code) {
    return WEATHER_CODE_LABELS[Number(code)] || "Unknown conditions";
}

function formatWindDirection(degrees) {
    const value = Number(degrees);
    if (!Number.isFinite(value)) {
        return "Unavailable";
    }

    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const index = Math.round((((value % 360) + 360) % 360) / 45) % directions.length;
    return `${directions[index]} (${Math.round(value)}°)`;
}

function clampNumber(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

function switchRightTab(tab) {
    state.activeRightTab = tab;
    $$(".right-tab").forEach((button) => {
        button.classList.toggle("active", button.dataset.rtab === tab);
    });
    $$(".right-page").forEach((page) => {
        page.classList.toggle("active", page.id === `rpage-${tab}`);
    });
    if (tab === "resilience" && !state.resilienceData && !state.resilienceLoading) {
        runResilienceAnalysis({ silent: true });
    }
}

function renderResiliencePanel() {
    const node = $("#capability-shell");
    if (!node) {
        return;
    }

    if (state.resilienceLoading) {
        node.innerHTML = `
            <section class="resilience-hero glass">
                <div class="sat-eyebrow">PHASE 1 RESILIENCE</div>
                <h3 class="sat-title">Computed hazard and planning assessment</h3>
                <p class="sat-subtitle">Building multi-hazard layers, cascading dependency impacts, role-based response views, and action plans from the active scenario.</p>
            </section>
            <section class="resilience-controls glass">
                ${renderResilienceControlBar(true)}
            </section>
            <section class="capability-section glass">
                <div class="right-empty">
                    <div>
                        <i class="fas fa-wave-pulse"></i>
                        <p>Computing multi-hazard, cascade, planning, and action-plan outputs...</p>
                    </div>
                </div>
            </section>
        `;
        bindResilienceControls();
        return;
    }

    if (!state.resilienceData) {
        node.innerHTML = `
            <section class="resilience-hero glass">
                <div class="sat-eyebrow">PHASE 1 RESILIENCE</div>
                <h3 class="sat-title">Functional resilience intelligence</h3>
                <p class="sat-subtitle">Run a computed resilience assessment for the active location, current scenario sliders, and selected response role.</p>
            </section>
            <section class="resilience-controls glass">
                ${renderResilienceControlBar(false)}
            </section>
            <section class="capability-section glass">
                <div class="right-empty">
                    <div>
                        <i class="fas fa-layer-group"></i>
                        <p>No resilience assessment yet. Run the module to generate hazards, cascades, role dashboards, stress tests, retrofit priorities, code gaps, and an emergency action plan.</p>
                    </div>
                </div>
            </section>
        `;
        bindResilienceControls();
        return;
    }

    const data = state.resilienceData;
    const selectedRole = data.role_dashboards[state.resilienceRole] || data.role_dashboards.executive;

    node.innerHTML = `
        <section class="resilience-hero glass">
            <div class="sat-eyebrow">PHASE 1 RESILIENCE</div>
            <h3 class="sat-title">${escapeHtml(data.overview.location_name.replaceAll("_", " "))}</h3>
            <p class="sat-subtitle">${escapeHtml(data.overview.asset_type)} under ${escapeHtml(data.overview.top_hazard)} watch with live role-driven response planning.</p>
            <div class="resilience-chip-grid">
                ${renderResilienceHeroChip("Risk", `${Number(data.overview.risk_score).toFixed(1)} / 100`)}
                ${renderResilienceHeroChip("Category", data.overview.risk_category)}
                ${renderResilienceHeroChip("Role", state.resilienceRole.replaceAll("_", " "))}
                ${renderResilienceHeroChip("Cascade", data.overview.cascade_status)}
            </div>
        </section>
        <section class="resilience-controls glass">
            ${renderResilienceControlBar(false)}
        </section>
        <section class="capability-section glass">
            <div class="capability-head">
                <div class="capability-icon"><i class="fas fa-triangle-exclamation"></i></div>
                <div>
                    <div class="capability-kicker">Multi-Hazard Integration</div>
                    <h4 class="capability-title">Active hazard layers</h4>
                    <p class="capability-summary">Computed overlays for the live scenario and selected location.</p>
                </div>
            </div>
            <div class="capability-grid">
                ${data.hazard_layers.map((hazard) => `
                    <article class="capability-card capability-card-strong">
                        <div class="capability-card-top">
                            <span class="capability-id">${escapeHtml(hazard.id)}</span>
                            <span class="capability-chip ${riskChipClass(hazard.score)}">${escapeHtml(hazard.status)}</span>
                        </div>
                        <h5 class="capability-card-title">${escapeHtml(hazard.title)}</h5>
                        <div class="resilience-metric-row">
                            <span class="resilience-metric-label">Hazard score</span>
                            <span class="resilience-metric-value">${Number(hazard.score).toFixed(1)}</span>
                        </div>
                        <div class="capability-points">
                            <div class="capability-point"><strong>Signal:</strong> ${escapeHtml(hazard.signal)}</div>
                            <div class="capability-point">${escapeHtml(hazard.detail)}</div>
                            <div class="capability-point"><strong>Action:</strong> ${escapeHtml(hazard.action)}</div>
                        </div>
                    </article>
                `).join("")}
            </div>
        </section>
        <section class="capability-section glass">
            <div class="capability-head">
                <div class="capability-icon"><i class="fas fa-diagram-project"></i></div>
                <div>
                    <div class="capability-kicker">Cascading Failure Simulation</div>
                    <h4 class="capability-title">Dependency chain and route impacts</h4>
                    <p class="capability-summary">Primary trigger: ${escapeHtml(data.cascade.primary_trigger)}. Route integrity is ${Number(data.cascade.route_integrity_score).toFixed(1)}%.</p>
                </div>
            </div>
            <div class="resilience-status-banner ${riskChipClass(100 - Number(data.cascade.route_integrity_score))}">
                <span>${escapeHtml(data.cascade.status)}</span>
                <span>${data.cascade.estimated_outage_hours} h outage window</span>
            </div>
            <div class="capability-grid">
                ${data.cascade.nodes.map((nodeItem) => `
                    <article class="capability-card">
                        <div class="capability-card-top">
                            <span class="capability-chip">Dependency node</span>
                            <span class="capability-id">${Number(nodeItem.score).toFixed(1)}</span>
                        </div>
                        <h5 class="capability-card-title">${escapeHtml(nodeItem.name)}</h5>
                        <div class="capability-point">${escapeHtml(nodeItem.status)} service posture under cascade simulation.</div>
                    </article>
                `).join("")}
            </div>
            <div class="resilience-chain">
                ${data.cascade.chain.map((step) => `
                    <div class="resilience-chain-step">
                        <div class="resilience-chain-stage">${escapeHtml(step.stage)}</div>
                        <div class="resilience-chain-title">${escapeHtml(step.title)}</div>
                        <div class="resilience-chain-text">${escapeHtml(step.impact)}</div>
                    </div>
                `).join("")}
            </div>
        </section>
        <section class="capability-section glass">
            <div class="capability-head">
                <div class="capability-icon"><i class="fas fa-users-gear"></i></div>
                <div>
                    <div class="capability-kicker">Role-Based Dashboards</div>
                    <h4 class="capability-title">${escapeHtml(titleCaseWords(state.resilienceRole.replaceAll("_", " ")))}</h4>
                    <p class="capability-summary">${escapeHtml(selectedRole.headline)}</p>
                </div>
            </div>
            <div class="resilience-mini-grid">
                ${selectedRole.kpis.map((kpi) => `
                    <div class="resilience-mini-card">
                        <span class="resilience-mini-label">${escapeHtml(kpi.label)}</span>
                        <span class="resilience-mini-value">${escapeHtml(kpi.value)}</span>
                    </div>
                `).join("")}
            </div>
            <div class="capability-points">
                ${selectedRole.actions.map((item) => `<div class="capability-point">${escapeHtml(item)}</div>`).join("")}
            </div>
        </section>
        <section class="capability-section glass">
            <div class="capability-head">
                <div class="capability-icon"><i class="fas fa-city"></i></div>
                <div>
                    <div class="capability-kicker">Scenario Planning & Stress Testing</div>
                    <h4 class="capability-title">What-if scenario comparisons</h4>
                    <p class="capability-summary">Planner-facing stress tests derived from the same live scenario inputs.</p>
                </div>
            </div>
            <div class="capability-grid">
                ${data.stress_tests.map((scenario) => `
                    <article class="capability-card">
                        <div class="capability-card-top">
                            <span class="capability-chip">Stress test</span>
                            <span class="capability-id">${Number(scenario.risk_score).toFixed(1)}</span>
                        </div>
                        <h5 class="capability-card-title">${escapeHtml(scenario.name)}</h5>
                        <div class="capability-points">
                            <div class="capability-point"><strong>Trigger:</strong> ${escapeHtml(scenario.trigger)}</div>
                            <div class="capability-point">${escapeHtml(scenario.summary)}</div>
                            <div class="capability-point"><strong>Loss:</strong> $${Number(scenario.loss_estimate_musd).toFixed(1)}M | <strong>Outage:</strong> ${scenario.outage_hours} h</div>
                        </div>
                    </article>
                `).join("")}
            </div>
        </section>
        <section class="capability-section glass">
            <div class="capability-head">
                <div class="capability-icon"><i class="fas fa-screwdriver-wrench"></i></div>
                <div>
                    <div class="capability-kicker">Retrofit Prioritization</div>
                    <h4 class="capability-title">Return-on-resilience ranking</h4>
                    <p class="capability-summary">Prioritized interventions ranked by consequence reduction versus retrofit cost.</p>
                </div>
            </div>
            <div class="capability-grid">
                ${data.retrofit_priorities.map((item) => `
                    <article class="capability-card">
                        <div class="capability-card-top">
                            <span class="capability-chip">${escapeHtml(item.priority)}</span>
                            <span class="capability-id">ROR ${Number(item.return_on_resilience).toFixed(2)}</span>
                        </div>
                        <h5 class="capability-card-title">${escapeHtml(item.asset)}</h5>
                        <div class="resilience-mini-grid">
                            <div class="resilience-mini-card">
                                <span class="resilience-mini-label">Retrofit</span>
                                <span class="resilience-mini-value">$${Number(item.retrofit_cost_musd).toFixed(1)}M</span>
                            </div>
                            <div class="resilience-mini-card">
                                <span class="resilience-mini-label">Replacement</span>
                                <span class="resilience-mini-value">$${Number(item.replacement_cost_musd).toFixed(1)}M</span>
                            </div>
                            <div class="resilience-mini-card">
                                <span class="resilience-mini-label">Consequence</span>
                                <span class="resilience-mini-value">${Number(item.consequence_score).toFixed(1)}</span>
                            </div>
                        </div>
                        <div class="capability-point">${escapeHtml(item.recommendation)}</div>
                    </article>
                `).join("")}
            </div>
        </section>
        <section class="capability-section glass">
            <div class="capability-head">
                <div class="capability-icon"><i class="fas fa-scale-balanced"></i></div>
                <div>
                    <div class="capability-kicker">Code Gap Analysis</div>
                    <h4 class="capability-title">Compliance and inspection gaps</h4>
                    <p class="capability-summary">Composite compliance score: ${Number(data.code_gap.compliance_score).toFixed(1)} / 100.</p>
                </div>
            </div>
            <div class="resilience-mini-grid">
                ${Object.entries(data.code_gap.component_scores).map(([label, value]) => `
                    <div class="resilience-mini-card">
                        <span class="resilience-mini-label">${escapeHtml(titleCaseWords(label.replaceAll("_", " ")))}</span>
                        <span class="resilience-mini-value">${Number(value).toFixed(1)}</span>
                    </div>
                `).join("")}
            </div>
            <div class="capability-points">
                ${data.code_gap.gaps.map((gap) => `
                    <div class="capability-point"><strong>${escapeHtml(gap.component)}:</strong> ${escapeHtml(gap.status)}. ${escapeHtml(gap.finding)}</div>
                `).join("")}
            </div>
        </section>
        <section class="capability-section glass">
            <div class="capability-head">
                <div class="capability-icon"><i class="fas fa-file-lines"></i></div>
                <div>
                    <div class="capability-kicker">Generative Emergency Response</div>
                    <h4 class="capability-title">Operational action plan</h4>
                    <p class="capability-summary">${escapeHtml(data.action_plan.briefing)}</p>
                </div>
            </div>
            <div class="capability-grid">
                <article class="capability-card">
                    <div class="capability-card-top">
                        <span class="capability-chip">Immediate actions</span>
                    </div>
                    <div class="capability-points">
                        ${data.action_plan.immediate_actions.map((item) => `<div class="capability-point">${escapeHtml(item)}</div>`).join("")}
                    </div>
                </article>
                <article class="capability-card">
                    <div class="capability-card-top">
                        <span class="capability-chip">Operations</span>
                    </div>
                    <div class="capability-points">
                        ${data.action_plan.operations.map((item) => `<div class="capability-point">${escapeHtml(item)}</div>`).join("")}
                    </div>
                </article>
                <article class="capability-card">
                    <div class="capability-card-top">
                        <span class="capability-chip">Resources</span>
                    </div>
                    <div class="capability-points">
                        ${data.action_plan.resources.map((item) => `<div class="capability-point">${escapeHtml(item.resource)}: ${escapeHtml(item.status)} (${item.quantity})</div>`).join("")}
                    </div>
                </article>
                <article class="capability-card">
                    <div class="capability-card-top">
                        <span class="capability-chip">Contacts</span>
                    </div>
                    <div class="capability-points">
                        ${data.action_plan.contacts.map((item) => `<div class="capability-point">${escapeHtml(item.role)}: ${escapeHtml(item.contact)}</div>`).join("")}
                        ${data.action_plan.critical_facilities.map((item) => `<div class="capability-point">Critical facility: ${escapeHtml(item)}</div>`).join("")}
                    </div>
                </article>
            </div>
        </section>
    `;

    bindResilienceControls();
}

function renderResilienceControlBar(isLoading) {
    const roles = [
        { key: "executive", label: "Executive" },
        { key: "emergency_manager", label: "Emergency" },
        { key: "engineer", label: "Engineer" },
        { key: "public", label: "Public" },
    ];
    return `
        <div class="resilience-controls-top">
            <div>
                <div class="capability-kicker">Live controls</div>
                <div class="resilience-control-copy">Scenario inputs, selected location, and role-aware decision framing.</div>
            </div>
            <button class="resilience-run-btn" id="resilience-run-btn" type="button" ${isLoading ? "disabled" : ""}>
                <i class="fas fa-bolt"></i>
                <span>${isLoading ? "Running" : "Run module"}</span>
            </button>
        </div>
        <div class="resilience-role-row">
            ${roles.map((role) => `
                <button
                    class="resilience-role-chip ${state.resilienceRole === role.key ? "active" : ""}"
                    type="button"
                    data-resilience-role="${role.key}"
                >${escapeHtml(role.label)}</button>
            `).join("")}
        </div>
    `;
}

function bindResilienceControls() {
    $("#resilience-run-btn")?.addEventListener("click", () => {
        runResilienceAnalysis();
    });
    $$("[data-resilience-role]").forEach((button) => {
        button.addEventListener("click", () => {
            state.resilienceRole = button.dataset.resilienceRole;
            renderResiliencePanel();
            if (state.resilienceData) {
                return;
            }
            runResilienceAnalysis({ silent: true });
        });
    });
}

function renderResilienceHeroChip(label, value) {
    return `
        <div class="sat-hero-chip">
            <span class="sat-hero-chip-label">${escapeHtml(label)}</span>
            <span class="sat-hero-chip-value">${escapeHtml(String(value))}</span>
        </div>
    `;
}

async function runResilienceAnalysis(options = {}) {
    state.resilienceLoading = true;
    renderResiliencePanel();

    try {
        const response = await fetch(`${API}/resilience`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                location_id: resolveLocationId(),
                earthquake_magnitude: Number($("#sl-eq").value),
                temperature: Number($("#sl-temp").value),
                soil_moisture: Number($("#sl-moist").value),
                role: state.resilienceRole,
            }),
        });
        const payload = await response.json();
        if (!response.ok) {
            throw new Error(payload.detail || "Resilience analysis failed");
        }
        state.resilienceData = payload;
        if (!options.silent) {
            setSystemStatus(`Resilience module ready for ${payload.overview.location_id}`);
        }
    } catch (error) {
        console.error(error);
        state.resilienceData = null;
        if (!options.silent) {
            window.alert(`Resilience Error: ${error.message}`);
            setSystemStatus("Resilience module error");
        }
    } finally {
        state.resilienceLoading = false;
        renderResiliencePanel();
    }
}

function riskChipClass(score) {
    if (Number(score) >= 70) {
        return "critical";
    }
    if (Number(score) >= 45) {
        return "warning";
    }
    return "safe";
}

function titleCaseWords(value) {
    return String(value).replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function toggleRightTabTray(expanded) {
    if (typeof expanded !== "boolean") {
        return;
    }

    state.rightTabTrayExpanded = expanded;
    const panel = $("#right-panel");
    const button = $("#right-tabs-menu");
    const icon = $("#right-tabs-menu-icon");
    panel?.classList.toggle("tab-strip-expanded", expanded);
    button?.setAttribute("aria-label", expanded ? "Collapse right dock tabs" : "Expand right dock tabs");
    if (icon) {
        icon.className = `fas fa-${expanded ? "xmark" : "bars"}`;
    }
}

function toggleLeftPanel(collapsed) {
    if (typeof collapsed !== "boolean") {
        return;
    }

    state.leftPanelCollapsed = collapsed;
    document.body.classList.toggle("left-panel-collapsed", collapsed);

    const button = $("#left-panel-toggle");
    const icon = $("#left-panel-toggle-icon");
    if (button) {
        button.setAttribute("aria-label", collapsed ? "Expand left control column" : "Collapse left control column");
    }
    if (icon) {
        icon.className = `fas fa-${collapsed ? "bars" : "angles-left"}`;
    }
    requestPlotResize();
}

function setBuildingPanelVisible(isVisible) {
    const detailPanel = $("#detail-panel");
    const emptyState = $("#building-empty");
    if (!detailPanel || !emptyState) {
        return;
    }
    detailPanel.style.display = isVisible ? "flex" : "none";
    emptyState.style.display = isVisible ? "none" : "grid";
}

function toggleRightPanel(collapsed) {
    if (typeof collapsed !== "boolean") {
        return;
    }

    state.rightPanelCollapsed = collapsed;
    document.body.classList.toggle("right-panel-collapsed", collapsed);

    const chevron = $("#right-panel-chevron");
    const toggle = $("#right-panel-toggle");
    if (chevron) {
        chevron.className = `fas fa-chevron-${collapsed ? "left" : "right"}`;
    }
    if (toggle) {
        toggle.setAttribute("aria-label", collapsed ? "Expand building AI panel" : "Collapse building AI panel");
    }

    requestPlotResize();
}

function renderSelectionSummary(payload = null) {
    const shell = $("#selection-summary");
    if (!shell) {
        return;
    }

    if (!payload) {
        shell.innerHTML = `
            <div class="right-empty">
                <div>
                    <i class="fas fa-location-dot"></i>
                    <p>No building selected yet. Choose a structure on the map to populate the dossier.</p>
                </div>
            </div>
        `;
        return;
    }

    if (payload.fallback) {
        shell.innerHTML = `
            <div class="metadata-grid">
                <div class="metadata-row">
                    <span class="metadata-label">Selected address</span>
                    <span class="metadata-value">${escapeHtml(payload.locationMeta?.address || "Mapped structure")}</span>
                </div>
                <div class="metadata-row">
                    <span class="metadata-label">Review status</span>
                    <span class="metadata-value">AI review fallback active. Scenario and CSV analysis remain available.</span>
                </div>
            </div>
        `;
        return;
    }

    shell.innerHTML = `
        <div class="metadata-grid">
            <div class="metadata-row">
                <span class="metadata-label">Selected asset</span>
                <span class="metadata-value">${escapeHtml(payload.locationMeta?.label || "Mapped structure")}</span>
            </div>
            <div class="metadata-row">
                <span class="metadata-label">Mapped address</span>
                <span class="metadata-value">${escapeHtml(payload.locationMeta?.address || "Unavailable")}</span>
            </div>
            <div class="metadata-row">
                <span class="metadata-label">Risk score</span>
                <span class="metadata-value">${Number(payload.risk || 0).toFixed(1)} / 100</span>
            </div>
            <div class="metadata-row">
                <span class="metadata-label">Height</span>
                <span class="metadata-value">${Number(payload.height || 0).toFixed(1)} m</span>
            </div>
            <div class="metadata-row">
                <span class="metadata-label">Estimated floors</span>
                <span class="metadata-value">${escapeHtml(String(payload.profile?.estimatedFloors || "N/A"))}</span>
            </div>
            <div class="metadata-row">
                <span class="metadata-label">Occupancy profile</span>
                <span class="metadata-value">${escapeHtml(payload.profile?.operationalExposure || "Unavailable")}</span>
            </div>
            <div class="metadata-row">
                <span class="metadata-label">Coordinates</span>
                <span class="metadata-value">${payload.lngLat?.lat?.toFixed(4)}, ${payload.lngLat?.lng?.toFixed(4)}</span>
            </div>
        </div>
    `;
}

function initNav() {
    $$(".nav-pill").forEach((button) => {
        button.addEventListener("click", () => {
            $$(".nav-pill").forEach((item) => item.classList.remove("active"));
            button.classList.add("active");
            state.activeHeaderView = button.dataset.view;
            syncHeaderView(button.dataset.view);
        });
    });
}

function syncHeaderView(view) {
    if (view === "dashboard") {
        switchBottomTab("charts");
        return;
    }
    if (view === "analysis") {
        switchBottomTab("shap");
        return;
    }
    document.getElementById("left-insights-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
    switchBottomTab("charts");
}

function initBottomPanel() {
    $$(".btm-tab").forEach((button) => {
        button.addEventListener("click", () => switchBottomTab(button.dataset.btab));
    });

    $$(".csub").forEach((button) => {
        button.addEventListener("click", () => {
            $$(".csub").forEach((item) => item.classList.remove("active"));
            button.classList.add("active");
            state.activeChart = button.dataset.chart;
            renderActiveChart();
        });
    });

    $("#btm-toggle").addEventListener("click", () => {
        state.bottomExpanded = !state.bottomExpanded;
        $("#bottom-panel").classList.toggle("collapsed", !state.bottomExpanded);
        $("#btm-chevron").className = `fas fa-chevron-${state.bottomExpanded ? "down" : "up"}`;
        requestPlotResize();
    });
}

function switchBottomTab(tab) {
    state.activeBottomTab = tab;
    $$(".btm-tab").forEach((button) => {
        button.classList.toggle("active", button.dataset.btab === tab);
    });
    $$(".btm-page").forEach((page) => {
        page.classList.toggle("active", page.id === `bpage-${tab}`);
    });
    requestPlotResize();
}

function initAnalyzeButton() {
    $("#btn-analyze").addEventListener("click", runAnalysis);
}

async function runAnalysis() {
    setSystemStatus(state.selectedFile ? "Uploading dataset" : "Running scenario");
    if (state.selectedFile) {
        await runUploadAnalysis();
        return;
    }
    await runScenario();
}

async function runUploadAnalysis() {
    const resetLoading = startLoadingSequence();

    try {
        const formData = new FormData();
        formData.append("file", state.selectedFile);

        const response = await fetch(`${API}/analyze`, {
            method: "POST",
            body: formData,
        });

        const payload = await response.json();
        if (!response.ok) {
            throw new Error(payload.detail || payload.error || "Dataset analysis failed");
        }

        state.analysisData = payload;
        await completeLoadingSequence(resetLoading);
        renderAnalysisResults(payload);
        setSystemStatus("Dataset analysis complete");
    } catch (error) {
        resetLoading();
        console.error(error);
        window.alert(`Analysis Error: ${error.message}`);
        setSystemStatus("Dataset analysis error");
    }
}

async function runScenario() {
    const resetLoading = startLoadingSequence();

    try {
        const locationId = resolveLocationId();
        const body = {
            location_id: locationId,
            earthquake_magnitude: Number($("#sl-eq").value),
            temperature: Number($("#sl-temp").value),
            soil_moisture: Number($("#sl-moist").value),
        };

        const response = await fetch(`${API}/scenario`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });
        const payload = await response.json();

        if (!response.ok) {
            throw new Error(payload.detail || "Scenario simulation failed");
        }

        state.analysisData = normalizeScenarioResponse(payload);
        await completeLoadingSequence(resetLoading);
        renderAnalysisResults(state.analysisData);

        const location = FALLBACK_LOCATIONS[locationId];
        if (location) {
            centerOnCoordinates(location.center, 13.7);
            addOrMoveMarker(location.center);
        }
        setSystemStatus(`Scenario complete for ${locationId}`);
    } catch (error) {
        resetLoading();
        console.error(error);
        window.alert(`Scenario Error: ${error.message}`);
        setSystemStatus("Scenario error");
    }
}

function normalizeScenarioResponse(payload) {
    const prediction = payload.prediction || {};
    return {
        risk_score: Number(prediction.risk_score || 0),
        risk_category: prediction.risk_category || riskToLabel(Number(prediction.risk_score || 0)),
        failure_probability: Number(prediction.failure_probability || 0),
        anomaly_score: Number(prediction.anomaly_score || 0),
        environmental_risk: Number(prediction.environmental_risk || 0),
        predicted_degradation: Number(prediction.predicted_degradation || 0),
        time_to_failure: getTimeToFailure(Number(prediction.failure_probability || 0)),
        time_series: payload.time_series || {},
        shap_features: payload.explanation || {},
        llm_explanation: {
            summary: `Scenario simulation produced a ${prediction.risk_category || "SAFE"} risk profile with a risk score of ${Number(prediction.risk_score || 0).toFixed(1)}.`,
            drivers: "Scenario mode focuses on live model outputs. Upload a CSV for full narrative analysis, validation, and chart bundles.",
            recommendations: buildScenarioRecommendations(prediction),
        },
    };
}

function buildScenarioRecommendations(prediction) {
    const risk = Number(prediction.risk_score || 0);
    if (risk >= 70) {
        return [
            "1. Increase manual inspection frequency immediately.",
            "2. Restrict loading until the scenario drivers are confirmed against field data.",
            "3. Upload telemetry CSV data to compare the scenario profile with real measurements.",
        ].join("\\n");
    }
    if (risk >= 40) {
        return [
            "1. Schedule a pre-emptive inspection window.",
            "2. Track the scenario again after adjusting environmental inputs.",
            "3. Validate the result against uploaded telemetry if available.",
        ].join("\\n");
    }
    return [
        "1. Maintain standard monitoring cadence.",
        "2. Use the sliders to stress-test more severe conditions.",
        "3. Upload a dataset to unlock full explainability and validation reporting.",
    ].join("\\n");
}

function resolveLocationId() {
    if (state.selectedBuilding?.lngLat) {
        const { lat, lng } = state.selectedBuilding.lngLat;
        const nearest = Object.entries(FALLBACK_LOCATIONS)
            .map(([key, location]) => ({
                key,
                distance: Math.hypot(location.center[0] - lng, location.center[1] - lat),
            }))
            .sort((left, right) => left.distance - right.distance)[0];
        return nearest?.key || "LOC_001";
    }

    const searchValue = $("#place-search").value.trim().toLowerCase();
    const match = Object.entries(FALLBACK_LOCATIONS).find(([, location]) =>
        location.label.toLowerCase().includes(searchValue)
    );
    return match?.[0] || "LOC_001";
}

function renderAnalysisResults(data) {
    updateMetrics(data);
    updateGauge(Number(data.risk_score || 0), data.risk_category || "SAFE");
    updateBuildingVisuals(Number(data.risk_score || 0));

    if (data.validation) {
        renderValidation(data.validation);
    } else {
        $("#validation-box").style.display = "none";
    }

    renderActiveChart();
    renderLLMInsights(data.llm_explanation);
    renderSHAP(data.shap_features);
    syncHeaderView(state.activeHeaderView);
    updateAlert(data);
    runResilienceAnalysis({ silent: true });
}

function updateMetrics(data) {
    const risk = Number(data.risk_score || 0);
    const failureProbability = Number(data.failure_probability || 0);
    const anomaly = Number(data.anomaly_score || 0);

    $("#mv-risk").textContent = risk.toFixed(1);
    $("#mv-fail").textContent = `${(failureProbability * 100).toFixed(1)}%`;
    $("#mv-ttf").textContent = data.time_to_failure || getTimeToFailure(failureProbability);
    $("#mv-anom").textContent = anomaly.toFixed(3);

    $("#mv-risk").style.color = getRiskColor(risk);
    $("#mt-risk").textContent = risk >= 70 ? "UP" : risk >= 40 ? "WATCH" : "STABLE";
    $("#mt-risk").style.color = getRiskColor(risk);

    $("#mt-fail").textContent = failureProbability >= 0.5 ? "UP" : "LOW";
    $("#mt-fail").style.color = failureProbability >= 0.5 ? THEME.critical : THEME.safe;

    $("#mt-anom").textContent = anomaly >= 0.7 ? "SPIKE" : "NOMINAL";
    $("#mt-anom").style.color = anomaly >= 0.7 ? THEME.critical : THEME.safe;
}

function updateGauge(score, category) {
    const radius = 60;
    const circumference = 2 * Math.PI * radius;
    const boundedScore = Math.max(0, Math.min(score, 100));
    const offset = circumference * (1 - boundedScore / 100);

    $("#gauge-arc").style.strokeDasharray = `${circumference}`;
    $("#gauge-arc").style.strokeDashoffset = `${offset}`;
    $("#gauge-num").textContent = Math.round(boundedScore).toString();
    $("#gauge-tag").textContent = category;
    $("#gauge-num").style.color = getRiskColor(boundedScore);
    $("#gauge-tag").style.color = getRiskColor(boundedScore);
}

function updateBuildingVisuals(score) {
    const level = score >= 70 ? "critical" : score >= 40 ? "warning" : "safe";
    document.body.dataset.riskLevel = level;

    if (state.mapMarker) {
        const element = state.mapMarker.getElement();
        element.className = `infra-marker ${level} selected`;
        element.innerHTML = `<span class="marker-ring"></span><i class="fas fa-building"></i>`;
    }
}

function renderValidation(report) {
    $("#validation-box").style.display = "block";

    const rows = [];
    rows.push(`
        <div class="val-row val-ok">
            <i class="fas fa-check-circle"></i>
            ${report.columns?.length || 14} required columns validated
        </div>
    `);
    rows.push(`
        <div class="val-row val-ok">
            <i class="fas fa-database"></i>
            ${report.final_rows || report.original_rows || 0} rows ready for analysis
        </div>
    `);

    if (report.imputed_columns?.length) {
        rows.push(`
            <div class="val-row val-warn">
                <i class="fas fa-wand-magic-sparkles"></i>
                ${report.imputed_columns.length} columns required imputation
            </div>
        `);
    }

    if (report.clipped_columns?.length) {
        rows.push(`
            <div class="val-row val-warn">
                <i class="fas fa-triangle-exclamation"></i>
                ${report.clipped_columns.length} columns were range-clipped
            </div>
        `);
    }

    if (report.missing_columns?.length) {
        rows.push(`
            <div class="val-row val-err">
                <i class="fas fa-times-circle"></i>
                Missing columns: ${escapeHtml(report.missing_columns.join(", "))}
            </div>
        `);
    }

    $("#validation-content").innerHTML = rows.join("");
}

function updateAlert(data) {
    const risk = Number(data.risk_score || 0);
    if (risk < 70) {
        $("#alert-banner").classList.remove("visible");
        return;
    }

    const failureProbability = Number(data.failure_probability || 0);
    $("#alert-text").textContent =
        `CRITICAL ALERT: risk index ${risk.toFixed(1)} | failure probability ${(failureProbability * 100).toFixed(1)}% | immediate engineering review recommended`;
    $("#alert-banner").classList.add("visible");
}

function renderActiveChart() {
    if (!state.analysisData) {
        return;
    }

    const chartRoot = $("#chart-main");
    const chartSpec = state.analysisData.charts?.[state.activeChart];
    if (chartSpec?.data) {
        renderPlotlySpec(chartRoot, chartSpec);
        return;
    }

    if (state.activeChart === "risk" && state.analysisData.charts?.risk_trend) {
        renderPlotlySpec(chartRoot, state.analysisData.charts.risk_trend);
        return;
    }

    const series = state.analysisData.time_series || {};
    const dataMap = {
        vibration: {
            values: series.vibration || [],
            label: "Vibration (mm/s)",
            color: "#3b82f6",
        },
        strain: {
            values: series.strain || [],
            label: "Strain",
            color: "#94a3b8",
        },
        temperature: {
            values: series.temperature || [],
            label: "Temperature (deg C)",
            color: "#cbd5e1",
        },
        correlation: null,
        risk: {
            values: state.analysisData.risk_scores_over_time || [],
            label: "Risk score",
            color: "#ef4444",
        },
    };

    const config = dataMap[state.activeChart];
    if (!config?.values?.length) {
        chartRoot.innerHTML = `<div class="chart-empty">No ${state.activeChart} data is available yet.</div>`;
        return;
    }

    Plotly.newPlot(
        chartRoot,
        [
            {
                type: "scatter",
                mode: "lines",
                x: config.values.map((_, index) => index + 1),
                y: config.values,
                line: {
                    color: config.color,
                    width: 2,
                },
                fill: "tozeroy",
                fillcolor: `${config.color}22`,
                hovertemplate: `${config.label}: %{y:.4f}<extra></extra>`,
            },
        ],
        buildChartLayout(config.label),
        { responsive: true, displayModeBar: false }
    );
}

function renderPlotlySpec(container, spec) {
    Plotly.newPlot(
        container,
        spec.data,
        {
            ...buildChartLayout(),
            ...(spec.layout || {}),
            paper_bgcolor: "rgba(0,0,0,0)",
            plot_bgcolor: "rgba(0,0,0,0)",
            font: {
                family: "'Inter', sans-serif",
                color: THEME.text,
                size: 11,
            },
        },
        { responsive: true, displayModeBar: false }
    );
}

function buildChartLayout(yTitle = "Value") {
    return {
        paper_bgcolor: "rgba(0,0,0,0)",
        plot_bgcolor: "rgba(0,0,0,0)",
        margin: { t: 14, r: 20, b: 42, l: 52 },
        font: {
            family: "'Inter', sans-serif",
            color: THEME.text,
            size: 11,
        },
        xaxis: {
            title: "Timestep",
            color: THEME.muted,
            gridcolor: THEME.grid,
            zerolinecolor: THEME.grid,
        },
        yaxis: {
            title: yTitle,
            color: THEME.muted,
            gridcolor: THEME.grid,
            zerolinecolor: THEME.grid,
        },
    };
}

function renderLLMInsights(llm) {
    const container = $("#llm-scroll");
    if (!llm) {
        container.innerHTML = `<div class="llm-empty"><i class="fas fa-robot"></i><p>No AI insights available yet.</p></div>`;
        return;
    }

    const sections = [
        { icon: "fa-clipboard-list", title: "Risk summary", key: "summary" },
        { icon: "fa-bolt", title: "Key drivers", key: "drivers" },
        { icon: "fa-earth-asia", title: "Environmental impact", key: "environmental_analysis" },
        { icon: "fa-building-shield", title: "Structural impact", key: "structural_analysis" },
        { icon: "fa-network-wired", title: "Infrastructure insights", key: "infrastructure_insights" },
        { icon: "fa-clock", title: "Timeline", key: "time_estimate" },
        { icon: "fa-list-check", title: "Recommendations", key: "recommendations" },
    ];

    const visibleSections = state.aiMode === "expert"
        ? sections
        : sections.filter((section) => ["summary", "recommendations", "time_estimate"].includes(section.key));

    const html = visibleSections
        .filter((section) => llm[section.key])
        .map((section) => `
            <article class="llm-section">
                <div class="llm-sec-title"><i class="fas ${section.icon}"></i> ${section.title}</div>
                <div class="llm-sec-body">${formatStructuredText(llm[section.key])}</div>
            </article>
        `)
        .join("");

    container.innerHTML = html || `<div class="llm-empty"><i class="fas fa-robot"></i><p>No AI insights generated.</p></div>`;
}

function renderSHAP(shap) {
    const chartTarget = $("#chart-shap");
    const listTarget = $("#shap-features");
    const explanations = shap?.explanations || shap?.top_features || [];

    if (!explanations.length) {
        chartTarget.innerHTML = `<div class="chart-empty">Explainability data will appear after analysis.</div>`;
        listTarget.innerHTML = `<div class="llm-empty"><i class="fas fa-search-plus"></i><p>No feature contributions available.</p></div>`;
        return;
    }

    const top = [...explanations]
        .sort((left, right) => Math.abs(right.contribution_value) - Math.abs(left.contribution_value))
        .slice(0, 10)
        .reverse();

    Plotly.newPlot(
        chartTarget,
        [
            {
                type: "bar",
                orientation: "h",
                y: top.map((item) => item.feature_name.replace(/_/g, " ")),
                x: top.map((item) => item.contribution_value),
                marker: {
                    color: top.map((item) => item.contribution_value >= 0 ? THEME.critical : THEME.safe),
                },
                hovertemplate: "%{y}: %{x:.4f}<extra></extra>",
            },
        ],
        {
            ...buildChartLayout("Contribution"),
            margin: { t: 12, r: 18, b: 34, l: 140 },
        },
        { responsive: true, displayModeBar: false }
    );

    const max = Math.max(...top.map((item) => Math.abs(item.contribution_value)), 0.001);
    listTarget.innerHTML = top
        .slice()
        .reverse()
        .map((item) => {
            const width = (Math.abs(item.contribution_value) / max) * 100;
            const color = item.contribution_value >= 0 ? THEME.critical : THEME.safe;
            return `
                <div class="shap-row">
                    <span class="shap-name">${escapeHtml(item.feature_name.replace(/_/g, " "))}</span>
                    <div class="shap-bar"><div class="shap-bar-fill" style="width:${width}%; background:${color}"></div></div>
                    <span class="shap-val">${item.contribution_value >= 0 ? "+" : ""}${item.contribution_value.toFixed(4)}</span>
                </div>
            `;
        })
        .join("");
}

function addToHistory(item) {
    state.recentBuildings = [item, ...state.recentBuildings.filter((entry) => entry.id !== item.id)].slice(0, 12);
    renderAnalysisHistory();
}

function renderAnalysisHistory() {
    const container = $("#infra-list");
    if (!state.recentBuildings.length) {
        container.innerHTML = `<div class="history-empty"><i class="fas fa-mouse-pointer"></i><br>No buildings analyzed yet</div>`;
        return;
    }

    container.innerHTML = state.recentBuildings
        .map((item) => `
            <button class="infra-item" type="button" data-lng="${item.lngLat.lng}" data-lat="${item.lngLat.lat}">
                <span class="infra-dot ${riskToClass(item.risk)}"></span>
                <span class="infra-copy">
                    <span class="infra-item-name">${escapeHtml(item.address)}</span>
                    <span class="infra-item-meta">${escapeHtml(item.fullAddress || "")}</span>
                </span>
                <span class="infra-item-type">${item.height.toFixed(0)}m</span>
            </button>
        `)
        .join("");

    $$(".infra-item").forEach((button) => {
        button.addEventListener("click", () => {
            centerOnCoordinates([Number(button.dataset.lng), Number(button.dataset.lat)], 17);
            addOrMoveMarker([Number(button.dataset.lng), Number(button.dataset.lat)]);
        });
    });
}

function initResizeHandling() {
    window.addEventListener("resize", requestPlotResize);
}

function requestPlotResize() {
    if (!window.Plotly) {
        return;
    }
    [
        "chart-main",
        "chart-shap",
        "satellite-chart-health",
        "satellite-chart-network",
        "satellite-chart-traffic",
    ].forEach((id) => {
        const node = document.getElementById(id);
        if (node?.data) {
            Plotly.Plots.resize(node);
        }
    });
}

function startLoadingSequence() {
    const overlay = $("#loading-overlay");
    const steps = $$(".lstep");
    overlay.style.display = "grid";
    steps.forEach((step) => step.classList.remove("active", "done"));
    let index = 0;
    steps[index]?.classList.add("active");

    const timer = setInterval(() => {
        if (index < steps.length) {
            steps[index]?.classList.remove("active");
            steps[index]?.classList.add("done");
        }
        index += 1;
        steps[Math.min(index, steps.length - 1)]?.classList.add("active");
    }, 420);

    return () => {
        clearInterval(timer);
        overlay.style.display = "none";
        steps.forEach((step) => step.classList.remove("active", "done"));
    };
}

function completeLoadingSequence(reset) {
    return sleep(300).then(reset);
}

function centerOnCoordinates(center, zoom = 16) {
    if (!state.mapReady || !state.map) {
        return;
    }

    state.map.flyTo({
        center,
        zoom,
        pitch: Math.max(state.map.getPitch(), 54),
        bearing: state.map.getBearing(),
        essential: true,
        duration: 1200,
    });
}

function setSystemStatus(text) {
    const status = $(".sys-status span");
    if (status) {
        status.textContent = text.toUpperCase();
    }
}

function getRiskColor(risk) {
    if (risk >= 70) {
        return THEME.critical;
    }
    if (risk >= 40) {
        return THEME.warning;
    }
    return THEME.safe;
}

function riskToClass(risk) {
    if (risk >= 70) {
        return "crit";
    }
    if (risk >= 40) {
        return "warn";
    }
    return "safe";
}

function riskToLabel(risk) {
    if (risk >= 70) {
        return "CRITICAL";
    }
    if (risk >= 40) {
        return "WARNING";
    }
    return "SAFE";
}

function getTimeToFailure(probability) {
    if (probability > 0.7) {
        return "< 6 months";
    }
    if (probability > 0.4) {
        return "6-18 months";
    }
    if (probability > 0.2) {
        return "1-3 years";
    }
    return "> 3 years";
}

function escapeHtml(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");
}

function formatParagraphs(value) {
    return escapeHtml(value).replace(/\n+/g, "<br>");
}

function formatStructuredText(value) {
    const escaped = escapeHtml(String(value));
    return escaped
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        .replace(/^(\d+\.\s.*)$/gm, '<span class="llm-line llm-line-number">$1</span>')
        .replace(/^-\s(.*)$/gm, '<span class="llm-line llm-line-bullet">$1</span>')
        .replace(/\n/g, "<br>");
}

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

document.addEventListener("DOMContentLoaded", init);
