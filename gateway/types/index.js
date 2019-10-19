const { gql } = require('apollo-server');
const fs = require('fs');
var query =  gql`${fs.readFileSync(__dirname.concat('/query.graphql'), 'utf8')}`;
var mutation =  gql`${fs.readFileSync(__dirname.concat('/mutation.graphql'), 'utf8')}`;
var bus =  gql`${fs.readFileSync(__dirname.concat('/bus.graphql'), 'utf8')}`;
var driver =  gql`${fs.readFileSync(__dirname.concat('/driver.graphql'), 'utf8')}`;
var schedule =  gql`${fs.readFileSync(__dirname.concat('/schedule.graphql'), 'utf8')}`;
var page =  gql`${fs.readFileSync(__dirname.concat('/page.graphql'), 'utf8')}`;

module.exports = [query, mutation, bus, driver, schedule, page];