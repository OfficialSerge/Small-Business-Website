import './FrostedGlass.css'

export function FrostedGlass({height, textHeight, width}) {
  return (
    <div className="container" style={{height, width}}>
      <p>BLURBOX</p>
      <div className="containerText" style={{height: textHeight, width}}>
        {textHeight != '0' && <p>TEXTBOX</p>}
      </div>
    </div>
  ) 
}  