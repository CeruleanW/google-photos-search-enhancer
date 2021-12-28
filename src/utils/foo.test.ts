import {filterByProperty} from './foo';

describe('filterByProperty', () => {
  test(`should return an array with customer name A`, () => {
    const input = [
      {
        device_name: 'Lawyers office meeting room',
        mac_address: '24',
        customer_name: 'A',
      },
      {
        device_name: 'Wellness Reception',
        mac_address: '7C:9E:BD:03:69:E2',
        customer_name: 'A',
      },
      {
        device_name: 'Giri home 1st floor',
        mac_address: '4C:11:AE:95:B5:FE',
        customer_name: 'B',
      },
      {
        device_name: 'Giri',
        mac_address: '4C:11:A2:95:B5:FE',
        customer_name: 'C',
      },
      {
        device_name: 'askde',
        mac_address: '4C:11:A2',
        customer_name: 'A',
      },
    ];

    const output = [
      {
        device_name: 'Lawyers office meeting room',
        mac_address: '24',
        customer_name: 'A',
      },
      {
        device_name: 'Wellness Reception',
        mac_address: '7C:9E:BD:03:69:E2',
        customer_name: 'A',
      },
      {
        device_name: 'askde',
        mac_address: '4C:11:A2',
        customer_name: 'A',
      },
    ];

    expect(filterByProperty(input, 'customer_name', 'A')).toEqual(output);
  });
});