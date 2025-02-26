var app = angular.module("pdfApp", []);

app.controller("PdfController", function ($scope, $http) {
    $scope.file = null;  // Store the selected file

    // Function to set file when selected
    $scope.setFile = function(element) {
        $scope.file = element.files[0];  // Store the selected file
        $scope.$apply();  // Ensure AngularJS updates the UI
    };

    $scope.uploadFile = function() {
        if (!$scope.file) {
            alert("Please select a PDF file first!");
            return;
        }

        var fd = new FormData();
        fd.append("file", $scope.file);

        $http.post("http://127.0.0.1:8000/upload/", fd, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        }).then(function(response) {
            console.log("Upload Success:", response.data);
            $scope.extractedText = response.data.extracted_text || "No text extracted.";
        }).catch(function(error) {
            console.error("Upload Error:", error);
            $scope.extractedText = "Error uploading file.";
        });
    };
});
