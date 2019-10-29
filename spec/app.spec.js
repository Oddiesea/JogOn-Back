process.env.NODE_ENV = "test";
const chai = require("chai");
const { expect } = chai;
const app = require("../app");
const request = require("supertest");
const connection = require("../connection");
