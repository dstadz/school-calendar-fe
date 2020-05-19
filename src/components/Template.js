import React, { useState } from 'react';
import {
  Flex,
  ButtonGroup,
  Button,
  Heading,
  IconButton
} from '@chakra-ui/core';
import { useRecoilState } from 'recoil'
import { templateForm } from '../utils/store'
const Template = ({
  id,
  starttime,
  endtime,
  summary,
  description,
  selected,
  applyTemplate,
  handleDelete
}) => {
  const [templateFormOpen, setTemplateForm] = useRecoilState(templateForm);
  console.log(templateFormOpen)

  const openTemplate = () => {
    console.log('clicked open template', templateFormOpen)
    setTemplateForm(!templateFormOpen);
  };

  return (
    <Flex direction="column" align="center" justify="center" my={2}>
      <Heading fontSize="sm" fontWeight="normal">
        {summary}
      </Heading>
      <Heading fontSize="sm" fontWeight="normal">
        {starttime}-{endtime}
      </Heading>
      <Flex>
        <ButtonGroup spacing={4}>
          <Button size="sm" variantColor="blue" onClick={() => openTemplate()}>
            Choose Dates
          </Button>
          <IconButton
            variantColor="red"
            aria-label="Delete"
            size="sm"
            icon="close"
            onClick={() => handleDelete(id)}
          />
        </ButtonGroup>
      </Flex>

      {templateForm && (
        <button onClick={() => applyTemplate(summary, description, starttime, endtime, selected)}>
          Apply Template
        </button>
      )}
    </Flex>
  );
};

export default Template;
