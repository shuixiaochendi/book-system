package com.example.book.controller;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.example.book.entity.Book;
import com.example.book.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/books")
@CrossOrigin(origins = "*")
public class BookController {

    @Autowired
    private BookService bookService;

    @GetMapping
    public ResponseEntity<Map<String, Object>> getBooks(
            @RequestParam(defaultValue = "1") int pageNum,
            @RequestParam(defaultValue = "10") int pageSize,
            @RequestParam(required = false) String keyword) {

        Page<Book> page = bookService.getBooksByPage(pageNum, pageSize, keyword);

        Map<String, Object> result = new HashMap<>();
        result.put("code", 2009);
        result.put("message", "success");
        result.put("data", page.getRecords());
        result.put("total", page.getTotal());
        result.put("pages", page.getPages());
        result.put("current", page.getCurrent());
        result.put("size", page.getSize());

        return ResponseEntity.ok(result);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getBookById(@PathVariable Long id) {
        Book book = bookService.getBookById(id);

        Map<String, Object> result = new HashMap<>();
        if (book != null) {
            result.put("code", 200);
            result.put("message", "success");
            result.put("data", book);
        } else {
            result.put("code", 404);
            result.put("message", "图书不存在");
        }

        return ResponseEntity.ok(result);
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> addBook(@RequestBody Book book) {
        boolean success = bookService.addBook(book);

        Map<String, Object> result = new HashMap<>();
        result.put("code", success ? 200 : 500);
        result.put("message", success ? "添加成功" : "添加失败");

        return ResponseEntity.ok(result);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> updateBook(@PathVariable Long id, @RequestBody Book book) {
        book.setId(id);
        boolean success = bookService.updateBook(book);

        Map<String, Object> result = new HashMap<>();
        result.put("code", success ? 200 : 500);
        result.put("message", success ? "更新成功" : "更新失败");

        return ResponseEntity.ok(result);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deleteBook(@PathVariable Long id) {
        boolean success = bookService.deleteBook(id);

        Map<String, Object> result = new HashMap<>();
        result.put("code", success ? 200 : 500);
        result.put("message", success ? "删除成功" : "删除失败");

        return ResponseEntity.ok(result);
    }

    /**
     * 批量删除图书
     * @param ids 要删除的图书ID列表
     * @return 删除结果
     */
    @DeleteMapping("/batch")
    public ResponseEntity<Map<String, Object>> batchDeleteBooks(@RequestBody List<Long> ids) {
        if (ids == null || ids.isEmpty()) {
            Map<String, Object> result = new HashMap<>();
            result.put("code", 400);
            result.put("message", "请选择要删除的图书");
            return ResponseEntity.ok(result);
        }

        int deletedCount = bookService.batchDeleteBooks(ids);

        Map<String, Object> result = new HashMap<>();
        result.put("code", 200);
        result.put("message", "成功删除 " + deletedCount + " 本图书");
        result.put("data", deletedCount);

        return ResponseEntity.ok(result);
    }
}
