// DOM Elements
const mapImage = document.getElementById('map-image');
const pin = document.getElementById('pin');
const sidebar = document.getElementById('sidebar');
const roomName = document.getElementById('room-name');
const showDirection = document.getElementById('show-direction');
const tabButtons = document.querySelectorAll('.tab-button');

let currentGifs = []; // Array to hold GIFs for the selected area

// Event Listener for Map Clicks
document.querySelectorAll('area').forEach((area) => {
    area.addEventListener('click', (e) => {
        e.preventDefault();

        // Get Room Name and GIFs
        const room = area.dataset.room;
        roomName.textContent = room;

        currentGifs = area.dataset.gifs.split(',');

        // Get area center coordinates
        const coords = area.coords.split(',').map(Number);
        const rect = mapImage.getBoundingClientRect();
        const x = (coords[0] + coords[2]) / 2 + rect.left;
        const y = (coords[1] + coords[3]) / 2 + rect.top;

        // Show Pin
        pin.style.left = `${x}px`;
        pin.style.top = `${y}px`;
        pin.style.display = 'block';

        // Show Sidebar
        sidebar.style.display = 'block';
    });
});

// Event Listener for Show Direction Button
showDirection.addEventListener('click', () => {
    if (currentGifs.length > 0) {
        let gifIndex = 0;

        const cycleGifs = () => {
            mapImage.src = currentGifs[gifIndex].trim(); // Ensure no leading/trailing spaces
            gifIndex = (gifIndex + 1) % currentGifs.length; // Loop through GIFs
        };

        cycleGifs(); // Show first GIF immediately
        const gifInterval = setInterval(cycleGifs, 3000);

        // Stop cycling on click elsewhere
        mapImage.addEventListener(
            'click',
            () => {
                clearInterval(gifInterval);
                mapImage.src = "{% static 'images/1stFloor/1STFLOOR.jpg' %}"; // Reset to default image
            },
            { once: true }
        );
    }
});

// Event Listener for Floor Tabs
tabButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const floorImage = button.dataset.floor;
        mapImage.src = floorImage;

        // Reset Pin and Sidebar
        pin.style.display = 'none';
        roomName.textContent = 'Select a Room';
        currentGifs = [];
    });
});

window.addEventListener("load", function() {
    var img = document.getElementById("map-image");
    var areas = document.querySelectorAll("map area");

    img.onload = function() {
        scaleCoords(img, areas);
    };

    window.onresize = function() {
        scaleCoords(img, areas);
    };

    function scaleCoords(image, areas) {
        var imgWidth = image.offsetWidth;
        var imgHeight = image.offsetHeight;

        areas.forEach(function(area) {
            var coords = area.getAttribute("coords").split(",");
            var scaledCoords = coords.map(function(coord, index) {
                if (index % 2 === 0) {
                    // Scale X coordinates
                    return Math.round(coord * imgWidth / originalImgWidth);
                } else {
                    // Scale Y coordinates
                    return Math.round(coord * imgHeight / originalImgHeight);
                }
            });
            area.setAttribute("coords", scaledCoords.join(","));
        });
    }
});


function showPathway(gifPath) {
    // Get the map image element and set its source to the clicked pathway GIF
    const mapImage = document.getElementById('map-image');
    mapImage.src = gifPath;
}


