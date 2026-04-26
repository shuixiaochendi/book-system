package com.example.book.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.example.book.entity.Book;
import com.example.book.mapper.BookMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookService {

    @Autowired
    private BookMapper bookMapper;

    public Page<Book> getBooksByPage(int pageNum, int pageSize, String keyword) {
        Page<Book> page = new Page<>(pageNum, pageSize);
        QueryWrapper<Book> queryWrapper = new QueryWrapper<>();

        if (keyword != null && !keyword.isEmpty()) {
            queryWrapper.like("book_name", keyword)
                       .or()
                       .like("book_no", keyword);
        }

        queryWrapper.orderByDesc("created_at");

        return bookMapper.selectPage(page, queryWrapper);
    }

    public Book getBookById(Long id) {
        return bookMapper.selectById(id);
    }

    public boolean addBook(Book book) {
        return bookMapper.insert(book) > 0;
    }

    public boolean updateBook(Book book) {
        return bookMapper.updateById(book) > 0;
    }

    public boolean deleteBook(Long id) {
        return bookMapper.deleteById(id) > 0;
    }

    /**
     * 批量删除图书
     * @param ids 要删除的图书ID列表
     * @return 实际删除的数量
     */
    public int batchDeleteBooks(List<Long> ids) {
        if (ids == null || ids.isEmpty()) {
            return 0;
        }
        return bookMapper.deleteBatchIds(ids);
    }
}
