function getBlockNameById(id) {
    if (id%1!=0||id<0||id>=blockNames.length) return; else return blockNames[id];
}

function getBlockIdByName(name) {
    for (var i=0;i<blockNames.length;i++) {
        if (blockNames[i]==name) return i;
    }
}

var blockNames = [
    "air",
    "stone",
    "bedrock",
    "dirt",
    "log",
    "plank",
    "grass",
    "leaf",
    ]; // an array of block names, which indexes are id's of blocks. 