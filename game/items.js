function getItemNameById(id) {
    if (!id||id==null||id.NaN||id%1!=0||id<0||id>=itemNames.length) return; else return itemNames[id];
}

function getItemIdByName(name) {
    if (!name||name==null) return;
    for (var i=0;i<itemNames.length;i++) {
        if (itemNames[i]==name) return i;
    }
}

var itemNames = [
    "pickaxe",
    ]; // an array of block names, which indexes are id's of blocks. 