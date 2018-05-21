
/* Save given data to a file */
function download(data, filename, type) {
    var blobData = new Blob([data], {type: type + ";charset=utf-8"})
    saveAs(blobData, filename);
}

function sortName(a,b)
{
    if(a.name > b.name){
        return 1;
    }
    if(a.name < b.name){
        return -1;
    }
    return 0;
}

/* Load selected images or images fom a folder in slider*/
function readImageFiles(input) {
    if (input.files && input.files[0]) {
        console.log(input.files)
        for(i=0;i<input.files.length;i++){
            console.log(input.files[i].name)
        }
        //input.files = Array.from(input.files).sort(sortName)
        file_list = Array.from(input.files).sort(sortName)
        console.log(file_list)
        console.log('--------------------')
        emptySlider();
        hideWidgets();
        emptyCanvas();
        images = {};//remove previous data
        imagesData = {};
        for(i=0;i<file_list.length;i++){
            readImageFile(file_list[i])
        }
        //for(i=0;i<input.files.length;i++){
        //    readImageFile(input.files[i]);
        //}
    }
}

/*read an image file and add to slider*/
function readImageFile(f){
    if(f.type.startsWith("image")){
        var reader = new FileReader();
        reader.onload = function (e) {
            var imgData = {
                name : f.name,
                data: e.target.result
            };
            imagesData[f.name] = imgData
            console.log(f.name)
            addToSlider(imgData);
        }
        console.log(f.name)
        reader.readAsDataURL(f);
    }
}

function readPointsFile(input) {
    if (input.files && input.files[0]) {
        var pointFile = input.files[0];
        
        var reader = new FileReader();
        reader.onload = function (e) {
            /* if(pointFile.name.endsWith(".pts")){
                loadPts(e.target.result);
            }else */ if(pointFile.name.endsWith(".json")){
                loadJson(e.target.result);
            }else if(pointFile.name.endsWith(".fpp")){
                loadFpp(e.target.result);
            }else if(pointFile.name.endsWith(".xml")){
                loadXml(e.target.result);
            }else{
                console.log("Not supported");
            }
        };

        reader.readAsText(input.files[0]);
    }
    input.value = null;
}
