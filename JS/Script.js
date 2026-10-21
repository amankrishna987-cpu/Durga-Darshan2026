
const photos = document.querySelectorAll(".gallery-item img");

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const closeButton = document.getElementById("close-lightbox");

const prevButton = document.getElementById("prev-photo");
const nextButton = document.getElementById("next-photo");

let currentPhotoIndex = 0;



if (
    photos.length > 0 &&
    lightbox &&
    lightboxImage &&
    closeButton &&
    prevButton &&
    nextButton
) {
    photos.forEach(function (photo) {
        photo.addEventListener("click", function () {
            currentPhotoIndex = Array.from(photos).indexOf(photo);
            lightboxImage.src = photo.src;
            lightbox.style.display = "flex";
        });
    });

    closeButton.addEventListener("click", function () {
        lightbox.style.display = "none";
    });

    lightbox.addEventListener("click", function (event) {
        if (event.target === lightbox) {
            lightbox.style.display = "none";
        }
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            lightbox.style.display = "none";
        }
    });

    function showPhoto(index) {
        currentPhotoIndex = index;
        lightboxImage.src = photos[currentPhotoIndex].src;
    }

    nextButton.addEventListener("click", function () {
        let nextIndex = currentPhotoIndex + 1;

        if (nextIndex >= photos.length) {
            nextIndex = 0;
        }

        showPhoto(nextIndex);
    });

    prevButton.addEventListener("click", function () {
        let prevIndex = currentPhotoIndex - 1;

        if (prevIndex < 0) {
            prevIndex = photos.length - 1;
        }

        showPhoto(prevIndex);
    });
}// yahan tak photo ko bada krne wala code h 


document.querySelectorAll(".pandal-video").forEach(function (video) {
    const message = video.nextElementSibling;

    function showComingSoon() {
        video.style.display = "none";

        if (message) {
            message.style.display = "block";
        }
    }

    video.addEventListener("error", showComingSoon);

    const source = video.querySelector("source");

    if (source) {
        source.addEventListener("error", showComingSoon);
    }
});


const searchInput = document.getElementById("area-search");
const searchResults = document.getElementById("search-results");

const areas = [
    { name: "Neemganj", url: "areas/neemganj.html" },
    { name: "Badi Pahadi", url: "areas/badi-pahari.html" },
    { name: "Bhainsasur", url: "areas/bhainsasur.html" },
    { name: "Mahalpar", url: "areas/mahalpar.html" },
    { name: "Khandakpar", url: "areas/khandakpar.html" },
    { name: "Mohaddi Nagar", url: "areas/mohaddi-nagar.html" },
    { name: "Pulpar", url: "areas/pulpar.html" },
    { name: "Laheri Mohalla", url: "areas/laheri-mohalla.html" },
    { name: "Tikulipar", url: "areas/tikulipar.html" },
    { name: "Saluganj Mohalla", url: "areas/saluganj-mohalla.html" },
    { name: "Atwari Bazar", url: "areas/atwari-bazar.html" },
    { name: "Soh-Sarai", url: "areas/soh-sarai.html" },
    { name: "Amber", url: "areas/amber.html" },
    { name: "Aalamganj", url: "areas/Aalamganj.html"},
    { name: "nai-sarai", url: "areas/nai-sarai.html"},
    { name: "Sahokhar", url: "areas/Sahokhar.html"},
    { name: "Daak-Bunglow", url: "area/Daak-bunglow.html"},
];


const searchButton = document.getElementById("search-button");

if (searchInput && searchResults && searchButton) {
    let selectedIndex = -1;

    function getSuggestions() {
        return Array.from(searchResults.querySelectorAll("a"));
    }

    function highlightSuggestion(index) {
        const suggestions = getSuggestions();

        suggestions.forEach(function (link, i) {
            link.style.background = i === index ? "#6d1026" : "";
            link.style.color = i === index ? "#ffd700" : "";
        });

        selectedIndex = index;

        if (suggestions[index]) {
            suggestions[index].scrollIntoView({ block: "nearest" });
        }
    }

    function findArea() {
        const query = searchInput.value.trim().toLowerCase();
        const suggestions = getSuggestions();

        if (selectedIndex >= 0 && suggestions[selectedIndex]) {
            window.location.href = suggestions[selectedIndex].href;
            return;
        }

        if (!query) {
            searchInput.focus();
            return;
        }

        const match = areas.find(area =>
            area.name.toLowerCase() === query
        );

        if (match) {
            window.location.href = match.url;
        } else {
            searchResults.innerHTML = "";
            searchResults.textContent = "No area found";
        }
    }

    searchInput.addEventListener("input", function () {
        const query = this.value.trim().toLowerCase();

        searchResults.innerHTML = "";
        selectedIndex = -1;

        if (!query) return;

        const matches = areas.filter(area =>
            area.name.toLowerCase().includes(query)
        );

        if (matches.length === 0) {
            searchResults.textContent = "No area found";
            return;
        }

        matches.forEach(function (area) {
            const link = document.createElement("a");
            link.href = area.url;
            link.textContent = area.name;

            link.addEventListener("mouseenter", function () {
                highlightSuggestion(getSuggestions().indexOf(link));
            });

            searchResults.appendChild(link);
        });
    });

    searchButton.addEventListener("click", findArea);

    searchInput.addEventListener("keydown", function (event) {
        const suggestions = getSuggestions();

        if (event.key === "ArrowDown" && suggestions.length > 0) {
            event.preventDefault();
            highlightSuggestion(
                selectedIndex < suggestions.length - 1
                    ? selectedIndex + 1
                    : 0
            );
        } else if (event.key === "ArrowUp" && suggestions.length > 0) {
            event.preventDefault();
            highlightSuggestion(
                selectedIndex > 0
                    ? selectedIndex - 1
                    : suggestions.length - 1
            );
        } else if (event.key === "Enter") {
            event.preventDefault();
            findArea();
        } else if (event.key === "Escape") {
            searchResults.innerHTML = "";
            selectedIndex = -1;
        }
    });

    document.addEventListener("click", function (event) {
        if (!event.target.closest(".nav-search")) {
            searchResults.innerHTML = "";
            selectedIndex = -1;
        }
    });
}



/* ===== DARSHAN COUNTDOWN & LIVE STATUS ===== */

const countdownElement = document.getElementById("countdown");
const statusElement = document.getElementById("darshan-status");

// Bihar Sharif Panchang: tithi timings in Indian Standard Time
const tithiSchedule = [
    {
        name: "Shukla Saptami",
        start: new Date("2026-10-17T05:54:00+05:30").getTime(),
        end: new Date("2026-10-18T08:27:00+05:30").getTime(),
        endText: "18 October, 8:27 AM"
    },
    {
        name: "Shukla Ashtami",
        start: new Date("2026-10-18T08:27:00+05:30").getTime(),
        end: new Date("2026-10-19T10:51:00+05:30").getTime(),
        endText: "19 October, 10:51 AM"
    },
    {
        name: "Shukla Navami",
        start: new Date("2026-10-19T10:51:00+05:30").getTime(),
        end: new Date("2026-10-20T12:50:00+05:30").getTime(),
        endText: "20 October, 12:50 PM"
    },
    {
        name: "Shukla Dashami",
        start: new Date("2026-10-20T12:50:00+05:30").getTime(),
        end: new Date("2026-10-21T14:11:00+05:30").getTime(),
        endText: "21 October, 2:11 PM"
    }
];

// Darshan schedule
const darshanOpeningTime =
    new Date("2026-10-17T18:00:00+05:30").getTime();

const darshanEndTime =
    new Date("2026-10-20T23:59:59+05:30").getTime();

function updateDarshanCountdown() {
    if (!countdownElement) {
        return;
    }

    const now = Date.now();
    console.log("Current time:", new Date(now).toString());
console.log("Current time in India:", new Date(now).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }));
    const difference = darshanOpeningTime - now;

    // Update the tithi status
    if (statusElement) {
        const currentTithi = tithiSchedule.find(
            tithi => now >= tithi.start && now < tithi.end
        );

        if (currentTithi) {
            const startTime = new Date(currentTithi.start);
            const endTime = new Date(currentTithi.end);

            const options = {
                day: "numeric",
                month: "long",
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
                timeZone: "Asia/Kolkata"
            };

            statusElement.textContent =
                `🗓️ ${currentTithi.name} | ` +
                `Starts: ${startTime.toLocaleString("en-IN", options)} | ` +
                `Ends: ${endTime.toLocaleString("en-IN", options)}`;
        }
        else if (now < tithiSchedule[0].start) {
            statusElement.textContent =
                "🗓️ Shashthi tithi | Saptami starts at 5:54 AM on 17 October.";
        } else if (now >= tithiSchedule[3].end) {
            statusElement.textContent =
                "🗓️ Dashami tithi has ended.";
        } else {
            statusElement.textContent =
                "🗓️ Tithi information is being updated.";
        }
    }

    // Before Darshan opens
    if (difference > 0) {
        const days = Math.floor(
            difference / (1000 * 60 * 60 * 24)
        );

        const hours = Math.floor(
            (difference % (1000 * 60 * 60 * 24)) /
            (1000 * 60 * 60)
        );

        const minutes = Math.floor(
            (difference % (1000 * 60 * 60)) /
            (1000 * 60)
        );

        const seconds = Math.floor(
            (difference % (1000 * 60)) / 1000
        );

        countdownElement.textContent =
            `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`;

        return;
    }

    // During the listed Darshan schedule
    if (now <= darshanEndTime) {
        countdownElement.textContent = "🪔 Darshan is Live!";
        return;
    }

    // After the listed Darshan schedule
    countdownElement.textContent = "Darshan schedule has ended.";
}

if (countdownElement) {
    updateDarshanCountdown();
    setInterval(updateDarshanCountdown, 1000);
}


console.log("Script.js loaded successfully");
console.log("Search input:", document.getElementById("area-search"));