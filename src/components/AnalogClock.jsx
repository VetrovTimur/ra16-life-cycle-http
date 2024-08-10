import { useEffect, useRef } from 'react';

function AnalogClock({ listClock, removeClock }) {
  const canvasRefs = useRef([]);

  const drawClock = (ctx, radius) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.beginPath();
    ctx.arc(radius, radius, radius - 10, 0, 2 * Math.PI);
    ctx.fillStyle = '#fff';
    ctx.fill();
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 5;
    ctx.stroke();

    for (let i = 0; i < 12; i++) {
      const angle = (i * Math.PI) / 6;
      const x1 = radius + (radius - 20) * Math.cos(angle);
      const y1 = radius + (radius - 20) * Math.sin(angle);
      const x2 = radius + (radius - 10) * Math.cos(angle);
      const y2 = radius + (radius - 10) * Math.sin(angle);
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }
  };

  const drawHands = (ctx, radius, hour, minute, second) => {
    const hourAngle = ((hour % 12) + minute / 60) * (Math.PI / 6);
    ctx.beginPath();
    ctx.moveTo(radius, radius);
    ctx.lineTo(radius + (radius - 50) * Math.cos(hourAngle - Math.PI / 2), radius + (radius - 50) * Math.sin(hourAngle - Math.PI / 2));
    ctx.lineWidth = 8;
    ctx.strokeStyle = '#333';
    ctx.stroke();

    const minuteAngle = (minute + second / 60) * (Math.PI / 30);
    ctx.beginPath();
    ctx.moveTo(radius, radius);
    ctx.lineTo(radius + (radius - 30) * Math.cos(minuteAngle - Math.PI / 2), radius + (radius - 30) * Math.sin(minuteAngle - Math.PI / 2));
    ctx.lineWidth = 6;
    ctx.strokeStyle = '#666';
    ctx.stroke();

    const secondAngle = second * (Math.PI / 30);
    ctx.beginPath();
    ctx.moveTo(radius, radius);
    ctx.lineTo(radius + (radius - 20) * Math.cos(secondAngle - Math.PI / 2), radius + (radius - 20) * Math.sin(secondAngle - Math.PI / 2));
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'red';
    ctx.stroke();
  };

  const updateClock = (index, timezone) => {
    const ctx = canvasRefs.current[index].getContext('2d');
    const radius = canvasRefs.current[index].width / 2;
    const now = new Date();
    const correctedHours = (now.getHours() + parseInt(timezone)) % 24;
    drawClock(ctx, radius);
    drawHands(ctx, radius, correctedHours, now.getMinutes(), now.getSeconds());
  };

  useEffect(() => {
    const interval = setInterval(() => {
      listClock.forEach((item, index) => {
        updateClock(index, item.timezone);
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [listClock]);

  return (
    <div>
      {
        listClock.map((clock, index) => (
          <div key={clock.name}>
            <h3>{clock.name}</h3>
            <canvas
              ref={el => canvasRefs.current[index] = el}
              width={200}
              height={200}
              style={{ border: '1px solid black' }}
            />
            <div className="imgRemove">
              <img src="src\components\remove.png" alt="img" onClick={() => {
                  removeClock(clock.name)
              }}/>
            </div>
          </div>
        ))
      }
    </div>
  );
}

export default AnalogClock;