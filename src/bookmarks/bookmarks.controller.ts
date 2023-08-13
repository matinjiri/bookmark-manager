import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { BookmarksService } from './bookmarks.service';
import { Bookmark } from './bookmark.model';
import { CreateBookmarkDTO } from './dto/create-bookmark.dto';
import { GetBookmarkDTO } from './dto/get-bookmark.dto';

@Controller('bookmarks')
// http://localhost:3000/bookmarks
export class BookmarksController {
    constructor(private bookmarksService: BookmarksService) {
        this.bookmarksService = bookmarksService;
    }

    @Get()
    find(@Query() getBookmarkDTO: GetBookmarkDTO): Bookmark[] {
        if (Object.keys(getBookmarkDTO).length) {
            return this.bookmarksService.find(getBookmarkDTO);
        }

        return this.bookmarksService.findAll()
    }

    @Get('/:id')
    findById(@Param('id') id: string): Bookmark {
        return this.bookmarksService.findById(id);
    }

    @Post()
    createBookmarks(@Body() createBookmarkDTO: CreateBookmarkDTO): Bookmark {
        return this.bookmarksService.createBookmark(createBookmarkDTO);
    }

    @Delete('/:id')
    deleteBookmark(@Param('id') id: string): void {
        this.bookmarksService.deleteBookmark(id);
    }

    // http://localhost:3000/bookmarks/:id/description
    @Patch('/:id/description')
    updateBookmark(
        @Param('id') id: string,
        @Body('description') description: string
    ): Bookmark {
        return this.bookmarksService.updateBookmark(id, description);
    }
}
