import React from 'react';
import { PlatformInfo } from '../../core/enums'
import { isNumber } from '../../core/utils';
import { Infos } from './infos';
import { fromSnakeCase, toTitleCase } from '../../core/utils';


const PLATFORM_INFOS = Object.keys(PlatformInfo).reduce((result, key) => {
  if (isNumber(key)) { result.push({ id: Number(key), name: PlatformInfo[key].toLocaleLowerCase().replace('_', ''), text: toTitleCase(fromSnakeCase(PlatformInfo[key])) }); }
  return result;
}, []);


export const PlatformInfos = ({ values, ...rest }) => {
  const props = {
    ...rest,
    header: 'Platform Info',
    values: PLATFORM_INFOS.map((item) => `${item.text}, ${values[item.name]}`)
  };
  return (<Infos {...props} />);
}


