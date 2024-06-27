function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            $('#imagePreview').css('background-image', 'url('+e.target.result +')');
            $('#imagePreview').hide();
            $('#imagePreview').fadeIn(650);
        }
        reader.readAsDataURL(input.files[0]);

        const formData = new FormData();
        formData.append('photo', input.files[0]);
        
        fetch('/profile/update/photo', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log('Profile picture updated successfully');
            } else {
                console.error('Error updating profile picture');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
}
$("#imageUpload").change(function() {
    readURL(this);
});