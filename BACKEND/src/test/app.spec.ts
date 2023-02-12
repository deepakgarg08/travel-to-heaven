import chai from 'chai';
import { expect } from 'chai';
import HotelController from '../controllers/hotel.controller';
import request from "supertest";
import express from "express";
import { Application } from "express";
import deepEqualInAnyOrder from 'deep-equal-in-any-order';
import logger from '../utils/logger';

// import data files
import resultByHotelId from './data/resultByHotelId.json';
import resultByIdAndLang from './data/resultByIdAndLang.json';
import resultByLang from './data/resultByLang.json';
import resultBySearch from './data/resultBySearch.json';
import resultByLangAndSearch from './data/resultByLangAndSearch.json';
import allHotelsData from './data/allHotelsData.json';

chai.use(deepEqualInAnyOrder);

describe("HotelController", () => {
  let app: Application;
  let hotelController: HotelController;

  beforeEach(() => {
    logger.silent =true
    app = express();
    hotelController = new HotelController();
    app.use(hotelController.router);
  });
 
  describe("GET /hotels", () => {
    it("should return the list of hotels", async () => {
      const response = await request(app).get("/hotels");
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property("success");
      expect(response.body).to.have.property("error");
      expect(response.body).to.have.property("result");
      expect(response.body.result).to.deep.equalInAnyOrder(allHotelsData);
    });
  });

  describe("GET /hotels/:hotelId", () => {
    it("should return a specific hotel by id - if hotelId is present", async () => {
      const response = await request(app).get("/hotels/2496");
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property("success");
      expect(response.body).to.have.property("error");
      expect(response.body).to.have.property("result");
      expect(response.body.result).to.deep.equalInAnyOrder(resultByHotelId);
    });
    
    it("should return a specific hotel by id - if hotelId is invalid", async () => {
      const response = await request(app).get("/hotels/1");
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property("success");
      expect(response.body).to.have.property("error"); 
      expect(response.body).to.have.property("result");
      expect(response.body.result).to.deep.equalInAnyOrder([]);
    });
  });

  describe("GET /hotels?lang=de-DE", () => {
    it("should return the list of hotels filtered by language", async () => {
      const response = await request(app).get("/hotels?lang=de-DE");
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property("success");
      expect(response.body).to.have.property("error");
      expect(response.body).to.have.property("result");
      expect(response.body.result).to.deep.equalInAnyOrder(resultByLang);
    });
  });

  describe("GET /hotels/2496?lang=de-DE", () => {
    it("should return the list of hotelId and filtered by language", async () => {
      const response = await request(app).get("/hotels/2496?lang=de-DE");
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property("success");
      expect(response.body).to.have.property("error");
      expect(response.body).to.have.property("result");
      expect(response.body.result).to.deep.equalInAnyOrder(resultByIdAndLang);
    });
  });

  describe("GET /hotels?search=Adlon&lang=de-DE", () => {
    it("should return the list of hotels filtered by search term and by Language", async () => {
      const response = await request(app).get("/hotels?search=Adlon&lang=de-DE");
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property("success");
      expect(response.body).to.have.property("error");
      expect(response.body).to.have.property("result");
      expect(response.body.result).to.deep.equalInAnyOrder(resultByLangAndSearch);
    });
  });

  describe("GET /hotels?search=Adlon", () => {
    it("should return the list of hotels filtered by search term", async () => {
      const response = await request(app).get("/hotels?search=Adlon");
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property("success");
      expect(response.body).to.have.property("error");
      expect(response.body).to.have.property("result");
      expect(response.body.result).to.deep.equalInAnyOrder(resultBySearch);
    });
  });
  
});
