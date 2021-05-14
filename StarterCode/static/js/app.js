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
        let sampleValues = sampleSort.map((samp) => samp.sample_Values);
        let label = sampleSort.map((label) => label.otu_labels);

        //parse out ids from metadata idti
        let metaIDs = parseInt(id);

        //get demo data for each id
        let demoidFilter = data.metadata.filter((demo) => demo.id === metaIDs);
        let demos = demoidFilter[0];

        //set up change event for dropdown
        mySelect.on("change", () => handleChange(mySelect));

        //build plots
        buildPlots(otu_ID, sampleValues, label);

        //get demo info from demoidfilter function
        metaData(demos);
        
    });
}

//create plots 
function buildPlots(otu_ID, sampleValues, label) {
    otu = otu_ID[0].slice(0, 10).reverse();
    vals = sampleValues[0].slice(0, 15).reverse();
    hoverText = label[0].slice(0, 10).reverse();


    //create labesls 
    otus = [];
    otu.forEach((title) => otus.push(`OTU ${title}`));

    //build bar chart
    let trace1 = {
        type: "bar",
        orientation: "h",
        x: vals,
        y: otus,
        text: hoverText,
        marker: {color: vals, colorscale: "Portland"},
    };

    //plot 
    let dataBar = [trace1];
    Plotly.newPlot("bar", dataBar);

    //build bubble chart
    let bubbleY = sampleValues[0];
    let bubbleX = otu_ID[0];
    let bubbleHover = label[0];

    //set up trace
    let trace2 = {
        text: bubbleHover,
        x: bubbleX,
        y: bubbleY,
        mode: "markers",
        marker: {color: bubbleX, size: bubbleY, colorscale: "Portland"},
    };

    //plot
    let dataBubble = [trace2];
    Plotly.newPlot("bubble", dataBubble);
}

//set up information to fill demo 
function metaData(demos) {
    let demoInfo= d3.select("#sample-metadate");
    demoInfo.html("");
    Object.entries(demos).forEach(([key, value]) => {
        demoInfo.append("option").text(`${key}: ${value}`);
    });

//set up change function
handleChange = () => {
    d3.event.preventDefault();
    let id = d3.select("#setDataset").property("value");
    init(id);
};

}

init();
