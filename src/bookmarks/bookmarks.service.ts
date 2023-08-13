import { Injectable } from '@nestjs/common';
import { Bookmark } from './bookmark.model';
import { v4 as uuid } from 'uuid';
import { CreateBookmarkDTO } from './dto/create-bookmark.dto';
import { GetBookmarkDTO } from './dto/get-bookmark.dto';

@Injectable()
export class BookmarksService {
    private bookmarks: Bookmark[] = [];

    public findAll(): Bookmark[] {
        return this.bookmarks;
    }

    public find(getBookmarkDTO: GetBookmarkDTO): Bookmark[] {
        let bookmarks = this.findAll();
        const {url, description} = getBookmarkDTO;

        if(url){
            bookmarks = bookmarks.filter((bookmark) => bookmark.url.toLowerCase().includes(url));
        }

        if(description){
            bookmarks = bookmarks.filter((bookmark) => bookmark.description.toLowerCase().includes(description));
        }

        return bookmarks;
    }

    findById(id: string): Bookmark {
        return this.bookmarks.find((bookmark) => bookmark.id == id);
    }

    public createBookmark(createBookmarkDTO: CreateBookmarkDTO): Bookmark {
        const { description, url } = createBookmarkDTO;
        const bookmark: Bookmark = {
            id: uuid(),
            url,
            description
        }

        this.bookmarks.push(bookmark);

        return bookmark;
    }

    public deleteBookmark(id: string): void {
        this.bookmarks = this.bookmarks.filter((bookmark) => bookmark.id !== id);
    } 

    public updateBookmark(id: string, description: string): Bookmark {
        const bookmark = this.findById(id);
        bookmark.description = description;
        return bookmark;
    }
}
