//  Full Screen Toggle
function toggleFullscreen() {
    if (!document.fullscreenElement &&
        !document.mozFullScreenElement &&
        !document.webkitFullscreenElement &&
        !document.msFullscreenElement) {
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) {
            document.documentElement.msRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
   }
   document.addEventListener('keyup', event => {
      if (event.code === 'Space') {
          toggleFullscreen();
      }
   })

// Overview counter creation
let totalDistanceBiked = 0;
let totalDistanceFoot = 0;

   
// Chart - 1 Hour Walk
window.addEventListener("DOMContentLoaded", (event) => {
    const sheetDataHandler = (sheetData) => {
      let chartDataX = [];
      let chartDataY = [];
      let totalDistanceWalk = 0;
      for (let i = 0; i < sheetData.length; i++) {
          chartDataX.push(sheetData[i].Date)
      }
      for (let i = 0; i < sheetData.length; i++) {
        chartDataY.push(sheetData[i].Distance);
        totalDistanceWalk += sheetData[i].Distance;
      }
      totalDistanceFoot += totalDistanceWalk;
      let totalWalkP = document.createElement('p');
      let walkingTotalText = document.getElementById('walkingTotal')
      totalWalkP.textContent = "Total of " + totalDistanceWalk + " miles in " + sheetData.length + " hours";
    //   walkingTotalText.appendChild(totalWalkP);
      let walkingAverageText = document.getElementById('walkingAverage');
      let averageWalkP = document.createElement('p');
      averageWalkP.textContent = "Average of " + (totalDistanceWalk/sheetData.length).toFixed(1) + " miles per hour";
    //   walkingAverageText.appendChild(averageWalkP)
    new Chart("walkChart", {
      type: "line",
      data: {
        labels: chartDataX,
        datasets: [{
          fill: false,
          lineTension: 0,
          pointStyle: 'rectRot',
          borderColor: "fuchsia",
          pointHoverBackgroundColor: "cyan",
          radius: 6,
          hoverRadius: 8,
          hitRadius: 18,
          data: chartDataY,
          backgroundColor: 'yellow',
        }]
        },
        options: {
          responsive: true,
          title: {
            display: true,
            text: '1  H o u r  W a l k s',
            fontColor: 'cyan',
            fontFamily: "VT323",
            fontSize: 24,
          },
          legend: {display: false},
          scales: {
            yAxes: [{
              min: 1.6,
              max: 2.4,
              ticks: {
                stepSize: .2,
                fontSize: 14,
                fontColor: "red",
                fontFamily: "VT323",
              },
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'D i s t a n c e   ( I n   M i l e s )',
                fontColor: "yellow",
                fontFamily: 'VT323',
                fontSize: 18
              },
              gridLines: {
                display: true,
                color: "rgba(255,255,255,0.3)",
              },
            }],
            xAxes: [{
              display: true,
              position: 'bottom',
              scaleLabel: {
                display: true,
                labelString: 'D a t e',
                fontColor: "yellow",
                fontFamily: "VT323",
                fontSize: 18,
              },
              ticks: {
                fontColor: "red",
                fontFamily: "VT323",
                fontSize: 14,
                minRotation: 40,
                maxRotation: 40,
              },
              gridLines: {
                display: true,
                color: "rgba(255,255,255,0.3)",
              }
            }]
          }
        }
      })
    }
    getSheetData({
      sheetID: "1QY2B4yhzlbQNz0Nuc72pc00FW9502McV6B4AKvdczkQ",
      sheetName: "1 Hour Walk",
      query: "SELECT A,B",
      callback: sheetDataHandler,
    });
   });
   