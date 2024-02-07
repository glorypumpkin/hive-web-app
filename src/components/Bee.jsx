
export default function Bee() {
    const css = `
    .bug {
        transform: rotate(-360deg);
        width: 50px;
        height: 50px;
        position: absolute;
        // animation: bee 5s linear infinite both;
      }
      .bee1 {
        width: 40px;
        height: 40px;
        border-radius: 20px;
        background-color: #FFC107;
        position: absolute;
        left: 50px;
        top: 50px;
        z-index: 6;
      }
      .bee2 {
        width: 40px;
        height: 40px;
        border-radius: 20px 18px 20px 18px;
        background-color: #FFC107;
        position: absolute;
        left: 30px;
        top: 50px;
        z-index: 4;
      
      }
      .black {
        width: 40px;
        height: 40px;
        border-radius: 20px 18px 20px 18px;
        background-color: black;
        position: absolute;
        left: 40px;
        top: 50px;
        z-index: 5;
      
      }
      .eye {
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background-color: black;
        position: absolute;
        right: 10px;
        top: 10px;
        z-index: 6;
        animation: eye 0.5s 2.2s 2 linear;
      }
      .wing {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: #BBDEFB;
        position: absolute;
        right: 10px;
        top: -15px;
        z-index: 2;
        border: 0.5px solid #90CAF9;
        animation: wings 1s linear infinite;
      }
      .wing2 {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: #BBDEFB;
        position: absolute;
        right: 0;
        top: -15px;
        border: 0.5px solid #90CAF9;
        z-index: 1;
        animation: wings2 1s linear infinite;
      }
      @keyframes bee {
        0% { 
          transform: rotate(0deg);
          margin-left: -25px;
          margin-top: 50px;}
        10% {
          transform: rotate(-10deg);
          margin-left: 25px;
          margin-top: 80px;
        }
        20% { 
          transform: rotate(-20deg);
          margin-left: 125px;
          margin-top: 80px;
        }
        50% {
          margin-left: 250px;
          margin-top: 50px;
          transform: rotate(-360deg);
        }
       60% {
           margin-left: 300px;
           margin-top: 60px;
           transform: rotate(-360deg);
        }
        100% { 
           margin-left: 450px;
           margin-top: 80px;
        }
      }
      @keyframes wings {
        20% {
          right: 12px;
        }
        30% {
          right: 8px;
        }
        40% {
          right: 12px;
        }
        50% {
          right: 8px;
        } 
        60% {
          right: 12px;
        }
        70% {
          right: 8px;
        }
        80% {
          right: 12px;
        }
        90% {
          right: 8px;
        }
      }
      @keyframes wings2 {  
        20% {
          right: -2px;
        }
        30% {
          right: 2px;
        }
        40% {
          right: -2px;
        }
        50% {
          right: 2px;
        } 
        60% {
          right: -2px;
        }
        70% {
          right: 2px;
        }
        80% {
          right: -2px;
        }
        90% {
          right: 2px;
        }
      }
      @keyframes eye {
        0% {  width: 5px;
        height: 5px;}
        10% {
        width: 0;
        height: 0;
        }
        40% {
        width: 5px;
        height: 5px;
        }
        50% {
        width: 5px;
        height: 5px;
        }
        100% {  width: 5px;
        height: 5px;}
      }
  `
    return (
        <div className='wrap'>
            <style>{css}</style>
            <div className="bug">
                <div className="bee1">
                    <div className="eye"></div>
                </div>
                <div className="bee2">
                    <div className="wing"></div>
                    <div className="wing2"></div>
                </div>
                <div className="black"></div>
            </div>
        </div>
    )
}