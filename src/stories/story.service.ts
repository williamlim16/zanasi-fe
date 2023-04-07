import { filePath } from "../api/server";
import { StoryEntity, StoryEntityResponse } from "./story.entity";

export function formatStory (story: StoryEntityResponse): StoryEntity {
  return {
    id: story.id,
    collectionId: story.collectionId,
    collectionName: story.collectionName,
    created: Date.parse(story.created),
    updated: Date.parse(story.updated),
    title: story.title,
    description: story.description,
    illustration: `${filePath}/${story.collectionId}/${story.id}/${story.illustration}`
  }

}

export default formatStory