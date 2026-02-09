require(
  ["esri/Map", "esri/Basemap", "esri/views/SceneView", "esri/Graphic", "esri/geometry/Point"],
  function (Map, Basemap, SceneView, Graphic, Point) {

    const basemap3D = new Basemap({
      portalItem: { id: "0560e29930dc4d5ebeb58c635c0909c9" }
    });

    const map = new Map({ basemap: basemap3D });

    const view = new SceneView({
      container: "viewDiv",
      map,
      camera: {
        position: { 
          longitude: 5.409274278268077, 
          latitude: 43.3386282530669, 
          z: 371.5248402878642 },
        heading: 31.440119753726293,
        tilt: 49.31217010594132
      }
    });

    //PING

    view.when(() => {
      const point = new Point({
        longitude: 5.412801,
        latitude: 43.342126,
        z: 5
      });

      const symbol = {
        type: "picture-marker",
        url: "./public/img/logo-jy2h.png",
        width: "30px",
        height: "30px"
      };

      const graphic = new Graphic({
        geometry: point,
        symbol,
        elevationInfo: { mode: "relative-to-ground", offset: 5 }
      });

      view.graphics.add(graphic);
    });

  }
);
