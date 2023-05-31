
const currtime = document.getElementById("current-time")
const inputTime = document.getElementById("hr")

var AlarmArray = []

const formatter = new Intl.NumberFormat('en-US', { 
    minimumIntegerDigits: 2
})



const time=()=> {
  var d = new Date();
  var s = d.getSeconds();
  var m = d.getMinutes();
  var h = d.getHours();
 currtime.innerHTML = formatter.format(h)+" : "+formatter.format(m)+" : "+formatter.format(s)
 
}

setInterval(time, 1000);


const setAlarm = () =>{
    
    const alramHr = inputTime.value.split(":")[0]
    const alarmMin = inputTime.value.split(":")[1]
    const alarmsec = inputTime.value.split(":")[2]
    if(alarmMin===undefined)  return;
    const newAlram = {
        hr:Number(alramHr),
        min:Number(alarmMin),
        sec:Number(alarmsec)
    }
    
    var toSet = true
    AlarmArray.map((data)=>{
        if(data.hr===newAlram.hr&&data.min===newAlram.min&&data.sec===newAlram.sec) 
            toSet=false
    })
    if(!toSet) return
    
    AlarmArray.push(newAlram)
    console.log(AlarmArray)
    showAlarm()
}

const checkAlarm = () =>{
    var d = new Date();
    var s = d.getSeconds();
    var m = d.getMinutes();
    var h = d.getHours();

    AlarmArray.map((data,index)=>{
        if(data.hr===h&&data.min===m&&data.sec===s){
            play()
            delete AlarmArray[index]
            console.log(AlarmArray)
            showAlarm()

        }
    })


}

setInterval(checkAlarm, 1000);

const showAlarm = () =>{
    const alrmPreview = document.getElementById("alarm-array")
    var html = ""
    AlarmArray.map((data,index)=>{
        html+=`<div class="alrm-container">
                      <p class="alrmtime" >${formatter.format(data.hr)+" : "+formatter.format(data.min)+" : "+formatter.format(data.sec)}</p>
                    <button id="index-${index}" onclick="deleteAlarm(this)">Delete</button>
                 </div>  `
    })   

    alrmPreview.innerHTML = html
}

const deleteAlarm = (data) =>{
    const index=data.id.split("-")[1]
    delete AlarmArray[index]
    showAlarm()
}

const audio = new Audio("audio.mp3")
const play = () =>{
    audio.play()
    document.getElementById("alarmpopup").classList.remove("off")
}
const stop = () =>{
    audio.pause()
    document.getElementById("alarmpopup").classList.add("off")
}
const showAlrmPopup=()=>{

}