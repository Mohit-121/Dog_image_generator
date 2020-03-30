var dropdown=$('#dog-breeds');

$.get('https://dog.ceo/api/breeds/list/all',function(data){
    var obj=data;
    var keys=Object.keys(obj.message);
    for(var key of keys){
        var ikeys=obj.message[key];
        var str=key;
        str=str[0].toUpperCase()+str.slice(1);
        dropdown.append(new Option(str,str.toLowerCase()));
    }
}).fail(function(xhr,textStatus,errorThrown){
    console.log("Request Failed");
});

dropdown.change(function(){
    let url="https://dog.ceo/api/breed/" + dropdown.val() + "/list";
    $.get(url,function(data){
        if(data.message.length!=0){
            let subBreeds=data.message;
            dropdown.after('<select id="dog-sub-breeds"></select>');
            var subDropdown=$('#dog-sub-breeds');
            for(let elt of subBreeds){
                var str=elt[0].toUpperCase()+elt.slice(1);
                subDropdown.append(new Option(str,elt));
            }
        }
    });
});



$('#btn').click(function(){
    event.preventDefault();
    var str=$("#dog-breeds option:selected").val();
    var select1=$('#dog-sub-breeds');
    if(select1.length!=0) str=str+"/"+$("#dog-sub-breeds option:selected").val();
    $('#dog-image-container img').remove();
    $.get('https://dog.ceo/api/breed/'+str+'/images',function(data){
        var imgurls=data.message;
        for(let imgurl of imgurls){
            $('<img>',{
                src:imgurl
            }).appendTo('#dog-image-container');
        }
    }).fail(function(xhr,textStatus,errorThrown){
        console.log("Request Failed");
    });
});