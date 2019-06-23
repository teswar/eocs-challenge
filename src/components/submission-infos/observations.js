import React from 'react';
import { Infos } from './infos';
import { toTitleCase } from '../../core/utils';


export const Observations = ({ values, ...rest }) => {
  const props = {
    ...rest,
    header: 'Observations',
    values: values.map((item) => toTitleCase(`${item.landcover}, ${item.landuse}`))
  };
  return (<Infos {...props} />);
}


