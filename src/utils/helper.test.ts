import * as operations from './helper';
const {
  trimObjectProperties,
} = operations;

describe('trimObjectProperties', () => {
  test(
    'should trim all 1st-level properties of an object',
    () => {
      const input = {
        "id": "58a2030d-a95f-4337-8f9a-bdab6604591c ",
        "customer_device_data_id": "5234502e-9121-45e7-930d-89f637412619  ",
        "customer_id": "  647b9112-8305-4ef8-9143-ab63c8f7751f",
        "building": "Devesh home",
        "location": "Home ",
        "floor": " FloorDevesh ",
        "wifi_ssid": "Parkdale reBOOT reLAY",
        "wifi_password": ""
      };

      const desiredOutput = {
        "id": "58a2030d-a95f-4337-8f9a-bdab6604591c",
        "customer_device_data_id": "5234502e-9121-45e7-930d-89f637412619",
        "customer_id": "647b9112-8305-4ef8-9143-ab63c8f7751f",
        "building": "Devesh home",
        "location": "Home",
        "floor": "FloorDevesh",
        "wifi_ssid": "Parkdale reBOOT reLAY",
        "wifi_password": ""
      };

      expect(trimObjectProperties(input)).toMatchObject(desiredOutput);
    }
  );
});