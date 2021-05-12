// set open browser function
function init(){
    //read data with d3
    d3.json("../data/samples.json").then((data) => {
        console.log(data);
        let mySelect = d3.select("#selDataset");
        data.names.forEach((element)=> {
            mySelect.append("options").attr("value", element).text(element);
        });
}