document.addEventListener("DOMContentLoaded", function() {
    var stars = document.querySelectorAll("#star-rate .star.v1 li");
    var inputField = document.getElementById("star-value");

    stars.forEach(function(star) {
        star.addEventListener("mouseover", function() {
            this.classList.add("active");
            let prevSibling = this.previousElementSibling;
            while (prevSibling) {
                prevSibling.classList.add("active");
                prevSibling = prevSibling.previousElementSibling;
            }
        });

        star.addEventListener("mouseout", function() {
            this.classList.remove("active");
            let prevSibling = this.previousElementSibling;
            while (prevSibling) {
                prevSibling.classList.remove("active");
                prevSibling = prevSibling.previousElementSibling;
            }
        });

        star.addEventListener("click", function() {
            this.classList.add("keep-active");
            let prevSibling = this.previousElementSibling;
            while (prevSibling) {
                prevSibling.classList.add("keep-active");
                prevSibling = prevSibling.previousElementSibling;
            }

            let nextSibling = this.nextElementSibling;
            while (nextSibling) {
                nextSibling.classList.remove("keep-active");
                nextSibling = nextSibling.nextElementSibling;
            }

            let starValue = this.getAttribute("data-value");
            inputField.value = starValue;
        });
    });
});


function highlightStars(ulElements, starCounts) {
    ulElements.forEach((ul, ulIndex) => {
        const starCount = starCounts[ulIndex];
        const stars = ul.querySelectorAll('li');
        stars.forEach((star, index) => {
            if (index < starCount) {
                star.classList.add('active');
            } else {
                star.classList.remove('highlight');
            }
        });
    });
}

const ulElements = document.querySelectorAll('#review-stars');
highlightStars(ulElements, starCounts);