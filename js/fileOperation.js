
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
    console.log(input.files)
    folder_name = input.files[0].webkitRelativePath.split("/")[0]
    console.log(folder_name)
    if (input.files && input.files[0]) {
        emptySlider();
        hideWidgets();
        emptyCanvas();
        images = {};//remove previous data
        imagesData = {};
        num_img = input.files.length;
        for(i=0;i<input.files.length;i++){
            readImageFile(input.files[i]);
        }
    }
}

function sort_add(imagesData){
    //console.log('sort_add')
    keys = Object.keys(imagesData);
    keys = Array.from(keys).sort();
    //console.log(keys)
    for(i=0;i<keys.length;i++){
        imagesData[keys[i]].order = i;
        if(i == keys.length - 1){
            imagesData[keys[i]].order = -1;
        }
        //console.log(imagesData[keys[i]].order,":",imagesData[keys[i]]);
        addToSlider(imagesData[keys[i]]);
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
            imagesData[f.name] = imgData;
            //console.log(f.name);
            num_img--;
            if(num_img == 0){
                sort_add(imagesData);
            }
            //addToSlider(imgData);
        }
        //console.log(f.name);
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
