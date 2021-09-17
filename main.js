window.addEventListener("load", function () {
    var today = new Date();
    var time = today.getHours();
    var mins = today.getMinutes();

    $(".admin").hide();


    if (!localStorage.getItem("clicks")){
        var counts = [0,0,0,0,0];
        localStorage.setItem("clicks", JSON.stringify(counts));
    } 
    if (time <8 || time >=14) {
        for (let i = 0; i < 5; i++) {
            $("#" + i).text(JSON.parse(localStorage.getItem("clicks"))[i] + " Clicks");
        }
        $(".admin").show();
    }
});

function clickCounter(i) {
    var today = new Date();
    var time = today.getHours();
    var mins = today.getMinutes();
    var score = i + 1;
    $(".a-div button").prop("disabled", true);

    if (localStorage.getItem("clicks")){
        var counts = JSON.parse(localStorage.getItem("clicks"));
        counts[i] = counts[i] + 1;
        localStorage.setItem("clicks", JSON.stringify(counts));
        var tot = total();
        localStorage.setItem(tot,String(tot + "," +i + "," + time + ":" + mins));
    }
    setTimeout(function () {$("button").prop("disabled", false);}, 1000);
};

function reset(){
    localStorage.clear();
    var counts = [0,0,0,0,0];
    localStorage.setItem("clicks", JSON.stringify(counts));
    for (let i = 0; i < 5; i++) {
        $("#" + i).text(JSON.parse(localStorage.getItem("clicks"))[i] + " Clicks");
    };
};

function download(data, filename, type) {
    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    };
};

function runDownload() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    var date = mm + '-' + dd + '-' + yyyy;
    var tot = total();

    var text = "1,2,3,4,5,Total, \n" + JSON.parse(localStorage.getItem("clicks")) + "," + tot + ",\n";
    text += "\n,Rating,Time";
    for (let i = 1; i <= tot; i++) {
        text += ", \n" + localStorage.getItem(i);
    }
    var name = "Results_" + date + ".csv";
    download(text, name, "text/csv");
};

function total(){
    var total = 0;
    for (let i = 0; i < 5; i++) {
        total += JSON.parse(localStorage.getItem("clicks"))[i];
    }
    return total;
}