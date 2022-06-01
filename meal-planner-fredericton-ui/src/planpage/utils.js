export function dayToNumber(day) {
  switch (day) {
  case 'MONDAY':
    return 0;
  case 'TUESDAY':
    return 1;
  case 'WEDNESDAY':
    return 2;
  case 'THURSDAY':
    return 3;
  case 'FRIDAY':
    return 4;
  case 'SATURDAY':
    return 5;
  case 'SUNDAY':
    return 6;
  }
}

export function numberToDay(number) {
  switch (number) {
  case 0:
    return 'MONDAY';
  case 1:
    return 'TUESDAY';
  case 2:
    return 'WEDNESDAY';
  case 3:
    return 'THURSDAY';
  case 4:
    return 'FRIDAY';
  case 5:
    return 'SATURDAY';
  case 6:
    return 'SUNDAY';
  }
}