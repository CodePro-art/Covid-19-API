// function to display in chart -> CONTINENT info
function barChart(element,data){
    const ctx = document.getElementById('chart').getContext('2d');
    let lables = toArray(element.list,"name").map(e => abriviate(e));
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: lables,
            datasets: [{
                label: `${stat} `,
                data: data,
                fill: false,
                backgroundColor: bgColor(data),
                hoverBackgroundColor: hoverBgColor(data),
                borderColor: borderColor(data),
                borderWidth: 1
            }]
        },
        options: {
            title: {
                display: true,
                text: `${element.name}`,
                fontSize: 20,
                fontColor: 'white',
            },
            legend: {
                labels: {
                fontColor: 'white',
                fontSize: 20
                }
             },
            scales:  {
                yAxes: [{
                    ticks: {
                        beginAtZero: false,
                        fontColor: 'white', 
                    },
                    gridLines: {
                        color: "rgba(0, 0, 0, 0)",
                        zeroLineColor: 'white'
                    }
                }],
                xAxes: [{
                    ticks: {
                        beginAtZero: false,
                        fontColor: 'white', 
                    },
                    gridLines: {
                        color: "rgba(0, 0, 0, 0)",
                        zeroLineColor: 'white'
                    } 
                }]
            }
        }
    });
}


