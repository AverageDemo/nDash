// Setup form

export default function Start() {
  navigator.geolocation.getCurrentPosition((position) => {
    const pos: string = `${position.coords.latitude},${position.coords.longitude}`;
    localStorage.setItem('pos', pos);
  });
  localStorage.setItem('name', 'John');
  localStorage.setItem('apiKey', process.env.OW_API_KEY || '');
  return <div>Init app</div>;
}
