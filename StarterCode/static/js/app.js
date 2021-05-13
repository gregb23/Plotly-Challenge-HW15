// set open browser function
function init(){
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
        let sample = data.samples.filter((sample) => sample.id === id);

        //sort samples 
        let sampleSort = sample.sort((a,b) => {
            return b-a;
        });

        //create map to get data for bar and bubble chart
        let otu_ID = sampleSort.map((otu) => otu.otu_ids);
        let sample_Values = sampleSort.map((samp) => samp.sample_Values);
        let label = sampleSort.map((label) => label.otu_labels);

        //parse out ids from metadata idti
        let metaIDs = parseInt(id);

        //get demo data for each id
        let demoidFilter = data.metadata.filter((demo) => demo.id === metaIDs);
        let demo = demoidFilter[0];

        //set up change event for dropdown
        mySelect.on("change", () => handleChange(mySelect));

        //build plots
        buildPlots(otu_ID, sample_Values, label);

        //get demo info from demoidfilter function
        metaData(demo);
        
    });
}

//create plots 
function buildPlots(otu_ID, sample_Values, label) {
    otu = otu_ID[0].slice(0, 15).reverse();
    vals = sample_Values[0].slice(0,15).reverse();
    hoverText = label[0].slice(0, 15).reverse();

    //create labesls 
    otus = [];
    otu.forEach((title) => otus.push(`OTU ${title}`));
}


    

    
