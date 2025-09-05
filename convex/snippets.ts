import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createSnippet = mutation({
  args: {
    title: v.string(),
    language: v.string(),
    code: v.string(),
  },

  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("User is unauthenticated");

    const user = await ctx.db
      .query("users")
      .withIndex("byUserId")
      .filter((q) => q.eq(q.field("userId"), identity.subject))
      .first();

    if (!user) throw new Error("User not found");

    const snippetId = await ctx.db.insert("snippets", {
      userId: identity.subject,
      userName: user.name,
      title: args.title,
      language: args.language,
      code: args.code,
    });

    return snippetId;
  },
});

export const deleteSnippet = mutation({
  args: {
    snippetId: v.id("snippets"),
  },

  handler: async (ctx, args) => {
    // check if user is authenticated
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("User is unauthenticated");

    // check if snippet exists
    const snippet = await ctx.db.get(args.snippetId);
    if (!snippet) throw new Error("Snippet not found");

    // check if user is the owner of the snippet
    if (snippet.userId !== identity.subject) {
      throw new Error("Not authorized to delete this snippet");
    }

    // delete comments
    const comments = await ctx.db
      .query("snippetComments")
      .withIndex("bySnippetId")
      .filter((q) => q.eq(q.field("snippetId"), args.snippetId))
      .collect();

    for (const comment of comments) {
      await ctx.db.delete(comment._id);
    }

    // delete stars
    const stars = await ctx.db
      .query("stars")
      .withIndex("bySnippetId")
      .filter((q) => q.eq(q.field("snippetId"), args.snippetId))
      .collect();

    for (const star of stars) {
      await ctx.db.delete(star._id);
    }

    await ctx.db.delete(args.snippetId);
  },
});

export const starSnippet = mutation({
  args: {
    snippetId: v.id("snippets"),
  },

  handler: async (ctx, args) => {
    // check if user is authenticated
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("User is unauthenticated");

    // check if star exists
    const star = await ctx.db
      .query("stars")
      .withIndex("byUserIdAndSnippetId")
      .filter(
        (q) =>
          q.eq(q.field("userId"), identity.subject) &&
          q.eq(q.field("snippetId"), args.snippetId)
      )
      .first();

    if (star) {
      await ctx.db.delete(star._id);
    } else {
      await ctx.db.insert("stars", {
        userId: identity.subject,
        snippetId: args.snippetId,
      });
    }
  },
});

export const getSnippets = query({
  handler: async (ctx) => {
    const snippets = await ctx.db.query("snippets").order("desc").collect();
    return snippets;
  },
});

export const isSnippetStarred = query({
  args: {
    snippetId: v.id("snippets"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return false;

    const star = await ctx.db
      .query("stars")
      .withIndex("byUserIdAndSnippetId")
      .filter(
        (q) =>
          q.eq(q.field("userId"), identity.subject) &&
          q.eq(q.field("snippetId"), args.snippetId)
      )
      .first();

    return !!star;
  },
});

export const getSnippetStarCount = query({
  args: {
    snippetId: v.id("snippets"),
  },
  handler: async (ctx, args) => {
    const stars = await ctx.db
      .query("stars")
      .withIndex("bySnippetId")
      .filter((q) => q.eq(q.field("snippetId"), args.snippetId))
      .collect();

    return stars.length;
  },
});
