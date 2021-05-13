// set open browser function
//function init(){
    //read data with d3
    d3.json("../data/samples.json").then((data) => {
        console.log(data);

        let mySelect = d3.select("#selDataset");
        data.names.forEach((element) => {
            mySelect.append("option").attr("value", element).text(element);
        });

        //get id for dropdown
        let id = mySelect.property("value");

        //set up filter for dropdown
        let sample = data.samples.filter((sample) => sample.id == id);
    });
    

    
