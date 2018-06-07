/* function populateSlider(imgs){
    //images = {};
    var photolist = $('.photolist');

    var thumbnails = [];
    for (var i = 0, len = imgs.length; i < len; i++) {
        var img = document.createElement('img');
        img.src = imgs[i].data;
        img.width = img.height = 80;
        thumbnails.push(img);
    }
    photolist.append(thumbnails);
} */


function addToSlider(imgData){
    var photolist = $('.photolist');

    var thumbnails = [];
    var img = document.createElement('img');
    img.src = imgData.data;
    //set an extra attribute reference to main images array
    var label = document.createAttribute("label"); 
    label.value = imgData.name;
    img.setAttributeNode(label);
    img.order = imgData.order;
    //console.log(img.order);
    img.title = imgData.name;
    img.width = img.height = 80;
    thumbnails.push(img);
    photolist.append(thumbnails);
}

var sliding = false;
var count = 0;
var sliderMove = "80px";
$('.left-paddle').click(function() {
    var photolist = $('.photolist');
    //console.log(photolist.children('img:first-child')[0].order)
    if (photolist.children('img:first-child')[0].order != 0){
        if (sliding === false) {
            sliding = true;
            photolist
                .css({ left: "-"+sliderMove })
                .prepend(photolist.children('img:last-child'))
                .animate({ left: 0 }, 200, 'linear', function() {
                    sliding = false;
                });
        }
    }
});
$('.right-paddle').click(function() {
    var photolist = $('.photolist');
    //console.log(photolist.children('img:nth-child(10)')[0].order)
    //console.log(photolist.children('img:last-child')[0].order)
    if (photolist.children('img:nth-child(10)')[0].order != -1){
        if (sliding === false) {
            sliding = true;
            photolist
                .animate({ left: "-"+sliderMove }, 200, 'linear', function() {
                photolist.css({ left: 0 })
                    .append(photolist.children('img:first-child'));
                sliding = false;
            });
        }
    }
});

function emptySlider(){
    $('.photolist').empty();
};

var target = '';
$(document).on('click', '.photolist img', function(ev){
    $("#test").val("");
    $(target).removeClass("color_border");
    $('#img').attr('src', imagesData[$(this).attr('label')].data);
    $('#img').attr('label', $(this).attr('label'));
    target = ev.target;
    $(ev.target).addClass("color_border");
});

//keydown 
$(document).keydown(function(e){
    if(e.keyCode==37){
        //console.log(target);
        //console.log(target.order);
        if (target.order != 0){
            $('.left-paddle').click();
            var next = target.previousSibling;
            $(target).removeClass("color_border");
            //console.log(next);
            target = next;
            $('#img').attr('src', imagesData[$(target).attr('label')].data);
            $('#img').attr('label', $(target).attr('label'));
            $(next).addClass("color_border");
        }
    }
    if(e.keyCode==39){
        //console.log(target);
        if (target.order != -1){
            var next = target.nextSibling;
            $(target).removeClass("color_border");
            //console.log(next);
            target = next;
            $('#img').attr('src', imagesData[$(target).attr('label')].data);
            $('#img').attr('label', $(target).attr('label'));
            $(next).addClass("color_border");
            $('.right-paddle').click();
        }
    }
});