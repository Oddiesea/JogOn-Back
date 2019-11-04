const polyline = require('@mapbox/polyline');
const testPoly = polyline.encode([[15.0, 1.5], [22.2, 2.2], [33.3, 3.3]]);

module.exports = [
  {
    poly: 'fdyugehwfdbweuy7fuijwehi67892389yuhjeidbgycghwby',
    length_in_km: 5.45,
    user_id: 1,
    min_lat: 1.1,
    max_lat: 2.2,
    min_long: 1.1,
    max_long: 2.2,
    start_location: 'POINT(1.1 1.1)',
    name: 'test route 1'
  },
  {
    poly: 'ytfgjiuiu8y8u8787879898989dhywhcvyhxk',
    length_in_km: 6.45,
    user_id: 2,
    min_lat: 1.1,
    max_lat: 2.2,
    min_long: 1.1,
    max_long: 2.2,
    start_location: 'POINT(1.1 1.1)',
    created_at: '1990-01-01',
    name: 'test route 2'
  },
  {
    poly: 'duhewjfhiuyeuowhf7t43iyr7474386582390rhckjchqiuef',
    length_in_km: 10.5,
    user_id: 3,
    min_lat: 1.1,
    max_lat: 2.2,
    min_long: 1.1,
    max_long: 2.2,
    start_location: 'POINT(1.1 1.1)',
    name: 'test route 3'
  },
  {
    poly: testPoly,
    length_in_km: 6.4,
    user_id: 4,
    min_lat: 15.0,
    max_lat: 335.123456,
    min_long: 1.5,
    max_long: 3.3,
    start_location: 'POINT(15.0 1.5)',
    name: 'test route 4'
  }
];

// 6;
// ('azigIdbmHA@EA?@ADEICUCMCW?WAODQBK?G@E?C@ICG?M?M?KCIAIAECGCKBW@SAK@K?I?EAEECEBC?A@?@C@IAC@CAE?E@C?@GFv@AzDQg@M[Qs@WiBIWm@yALA');
// 0.388;
// 1;
// ('2019-11-04 13:26:06.245829+00');
// 53.79502;
// 53.79613;
// -1.54682;
// -1.5445;
// ('POINTS(53.79505 -1.54675');
// ('Greggs');
// 7;
// ('o`jgIjslH@?@ABB?B@@??@DBD@B?B@D?B?B?B@@@BB@DA?D?B@D?@?F?B?@?F?D@@H?FA@DBABAB?@?@?DBB?B@B?HAD@BF@@@ABAB?@@@?D?BA@A@AB?BCDC@A@A@ABA@CB@?B@@B?B@@@B@@@@@B?@?B@@ABABAB?@@@?BB@D?F?D?B@@?B@B?B?D@B@H?D?D?B?D?F?D?BAD?B?@?B?B?DAB?D?B?B?DAB?FADAB?B?F?B?B?D?@?B?@AH@B@ (...)');
// 0.284;
// 1;
// ('2019-11-04 13:35:03.309202+00');
// 53.79486;
// 53.79611;
// -1.54677;
// -1.54434;
// ('POINTS(53.79608 -1.54438');
// ('Reverse Greggs');
// 8;
// ('izigIrbmH@?A?CDCDCB@FC@?@@BAD?B?B@BABABABCBA@CBA?C@A@A@AB?AA@C??BA?C??@A?A?ACC?AAA?ACACACEECCE@A@AAEAA?A@CGA@C??CC?ECA?A?CEEACFGN@?@BADANAN?B?B?B?F@PBAAD@D?F?@?B?F?B');
// 0.152;
// 1;
// ('2019-11-04 14:17:03.768675+00');
// 53.79505;
// 53.79587;
// -1.54775;
// -1.54679;
// ('POINTS(53.79509 -1.54682');
// ('Dave’s outing');
// 9;
// ('w_jgIpimH?AAC?E?C@??GAA?C@C@A?C@C@E?C@C?C@C@A@C?E@CAIEUBA@ACG@??E@CB@FBD@@?@A?AB@BBBABCBC@A@@@@B?B@@A@A?AB@D?B?B@@?@@DCBAB?BAB?@@BA@A@A@E@CBE?C@ABC@A@C@A@A@A?ABC@A@G?CAC?A@C@C');
// 0.158;
// 1;
// ('2019-11-04 14:19:24.109582+00');
// 53.79512;
// 53.796;
// -1.54796;
// -1.54682;
// ('POINTS(53.79596 -1.54793');
// ('Dave’s triumphant return');
