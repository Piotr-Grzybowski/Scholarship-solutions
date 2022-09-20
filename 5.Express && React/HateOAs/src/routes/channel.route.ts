import express, { Request } from "express";
import { BasicChannel } from "../interfaces/channel/basicChannel.interface";
import { Channel } from "../interfaces/channel/channel.interface";
import * as ChannelService from "../services/channel.service";
import { ResponseWithHateoas } from "./types";
import { parseHateoasLinks } from "../hateoas/parseHateoasLinks";

export const channelsRouter = express.Router({ mergeParams: true });

channelsRouter.get("/", async (req: Request, res: ResponseWithHateoas) => {
  try {
    const channels: Channel[] = await ChannelService.findAll(req.params.id);
    res.status(200).json({ channels }, parseHateoasLinks(req));
  } catch (err) {
    res.status(500).send(err.message);
  }
});

channelsRouter.get(
  "/:channelId",
  async (req: Request, res: ResponseWithHateoas) => {
    try {
      const userId: string = req.params.id;
      const channelId: string = req.params.channelId;
      const channel: Channel = await ChannelService.findChannel(
        userId,
        channelId
      );
      res.status(200).json({ channel }, parseHateoasLinks(req));
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
);

channelsRouter.post("/", async (req: Request, res: ResponseWithHateoas) => {
  try {
    const userId = req.params.id;
    const channel: BasicChannel = req.body;
    const addedChannel = await ChannelService.addChannel(userId, channel);
    res.status(201).json(addedChannel, parseHateoasLinks(req));
  } catch (err) {
    res.status(500).send(err.message);
  }
});

channelsRouter.put(
  "/:channelId",
  async (req: Request, res: ResponseWithHateoas) => {
    try {
      const userId: string = req.params.id;
      const channelId: string = req.params.channelId;
      const channel: BasicChannel = req.body;
      await ChannelService.editChannel(userId, channelId, channel);
      res.status(200).json(channel, parseHateoasLinks(req));
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
);

channelsRouter.delete(
  "/:channelId",
  async (req: Request, res: ResponseWithHateoas) => {
    try {
      const userId: string = req.params.id;
      const channelId: string = req.params.channelId;
      const channel: Channel = await ChannelService.findChannel(
        userId,
        channelId
      );
      await ChannelService.deleteChannel(userId, channelId);
      res.status(200).json(channel, parseHateoasLinks(req));
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
);
