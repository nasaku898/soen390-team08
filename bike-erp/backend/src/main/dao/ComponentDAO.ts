import db from "../helpers/db";

export const fetchAllComponents = () => {
  return new Promise<Array<any>>((resolve, reject) => {
    const query = `
            SELECT c.price, c.quantity, c.component_type, c.component_status, c.size, c.specificComponentType, cl.component_id, cl.location_name 
            FROM component c , component_location cl
            WHERE c.component_id=cl.component_id`;
    db.query(query, (err, rows) => {
      if (err) return reject(err);
      resolve(JSON.parse(JSON.stringify(rows)));
    });
  });
};

export const fetchComponent = (id: string) => {
  return new Promise((resolve, reject) => {
    const query = `
            SELECT c.price, c.quantity, c.component_type, c.component_status, c.size, c.specificComponentType, cl.component_id, cl.location_name 
            FROM component c , component_location cl
            WHERE c.component_id = ? and c.component_id = cl.component_id`;
    db.query(query, [id], (err, rows) => {
      if (err) return reject(err);
      resolve(JSON.parse(JSON.stringify(rows)));
    });
  });
};

export const updateComponent = (id: string, quantity: string) => {
  return new Promise((resolve, reject) => {
    const query = "UPDATE component SET quantity=? WHERE component_id=?";
    db.query(query, [quantity, id], (err, rows) => {
      if (err) return reject(err);
      resolve(JSON.parse(JSON.stringify(rows)));
    });
  });
};

export const fetchComponentLocation = (id: string) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM component_location WHERE component_id = ?";
    db.query(query, [id], (err, rows) => {
      if (err) return reject(err);
      resolve(JSON.parse(JSON.stringify(rows)));
    });
  });
};

export const fetchAllLocations = () => {
  return new Promise((resolve, reject) => {
    const query = "select distinct location_name from component_location"
    db.query(query, (err, rows) => {
      if (err) return reject(err);
      resolve(JSON.parse(JSON.stringify(rows)))
    })
  })
}
export const fetchComponentTypes = (location: string, size: string) => {
  return new Promise<Array<any>>((resolve, reject) => {
    //queries for each type of component
    const queryHandle = `SELECT c.component_id, c.price, c.quantity, c.component_type, c.component_status, c.size, c.specificComponentType, cl.location_name
    FROM component c, component_location cl
    WHERE c.component_type = "HANDLE" AND c.component_id = cl.component_id AND cl.location_name = ? AND c.size = ?;`;

    const queryWheel = `SELECT c.component_id, c.price, c.quantity, c.component_type, c.component_status, c.size, c.specificComponentType, cl.location_name
    FROM component c, component_location cl
    WHERE c.component_type = "WHEEL" AND c.component_id = cl.component_id AND cl.location_name = ? AND c.size = ?;`;

    const querySeat = `SELECT c.component_id, c.price, c.quantity, c.component_type, c.component_status, c.size, c.specificComponentType, cl.location_name
    FROM component c, component_location cl
    WHERE c.component_type = "SEAT" AND c.component_id = cl.component_id AND cl.location_name = ? AND c.size = ?;`;

    const queryDriveTrain = `SELECT c.component_id, c.price, c.quantity, c.component_type, c.component_status, c.size, c.specificComponentType, cl.location_name
    FROM component c, component_location cl
    WHERE c.component_type = "DRIVE_TRAIN" AND c.component_id = cl.component_id AND cl.location_name = ? AND c.size = ?;`;

    const queryFrame = `SELECT c.component_id, c.price, c.quantity, c.component_type, c.component_status, c.size, c.specificComponentType, cl.location_name
    FROM component c, component_location cl
    WHERE c.component_type = "FRAME" AND c.component_id = cl.component_id AND cl.location_name = ? AND c.size = ?;`;

    let results: any = {
      HANDLE: [],
      WHEEL: [],
      SEAT: [],
      DRIVE_TRAIN: [],
      FRAME: [],
    };

    //queries to get all the different components types grouped by location and size
    db.query(queryHandle, [location, size], (err, rows) => {
      if (err) return reject(err);
      let resultsHandle = Object.values(JSON.parse(JSON.stringify(rows)));
      resultsHandle.forEach((element: any) => results.HANDLE.push(element));

      db.query(queryWheel, [location, size], (err, rows) => {
        if (err) return reject(err);
        let resultsWheel = Object.values(JSON.parse(JSON.stringify(rows)));
        resultsWheel.forEach((element: any) => results.WHEEL.push(element));

        db.query(querySeat, [location, size], (err, rows) => {
          if (err) return reject(err);
          let resultsSeat = Object.values(JSON.parse(JSON.stringify(rows)));
          resultsSeat.forEach((element: any) => results.SEAT.push(element));

          db.query(queryDriveTrain, [location, size], (err, rows) => {
            if (err) return reject(err);
            let resultsDriveTrain = Object.values(
              JSON.parse(JSON.stringify(rows))
            );
            resultsDriveTrain.forEach((element: any) =>
              results.DRIVE_TRAIN.push(element)
            );

            db.query(queryFrame, [location, size], (err, rows) => {
              if (err) return reject(err);
              let resultsFrame = Object.values(
                JSON.parse(JSON.stringify(rows))
              );
              resultsFrame.forEach((element: any) =>
                results.FRAME.push(element)
              );
              resolve(results);
            });
          });
        });
      });
    });
  });
};
