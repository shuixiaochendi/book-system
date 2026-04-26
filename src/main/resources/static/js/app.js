const API_BASE_URL = '/api/books';

new Vue({
    el: '#app',
    data: {
        tableData: [],
        searchKeyword: '',
        pagination: {
            current: 1,
            size: 10,
            total: 0
        },
        dialogVisible: false,
        dialogTitle: '添加图书',
        form: {
            id: null,
            bookName: '',
            bookNo: '',
            remarks: ''
        },
        rules: {
            bookName: [
                { required: true, message: '请输入图书名称', trigger: 'blur' }
            ],
            bookNo: [
                { required: true, message: '请输入图书编号', trigger: 'blur' }
            ]
        },
        selectedBooks: []
    },
    mounted() {
        this.loadBooks();
    },
    methods: {
        loadBooks() {
            const that = this;
            const xhr = new XMLHttpRequest();
            xhr.open('GET', `${API_BASE_URL}?pageNum=${that.pagination.current}&pageSize=${that.pagination.size}&keyword=${that.searchKeyword}`, true);
            xhr.setRequestHeader('Content-Type', 'application/json');

            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        const response = JSON.parse(xhr.responseText);
                        if (response.code === 200) {
                            that.tableData = response.data;
                            that.pagination.total = response.total;
                            // 只更新total，不更新current和size，避免覆盖用户选择
                            that.selectedBooks = [];
                        }
                    } else {
                        that.$message.error('加载图书列表失败');
                    }
                }
            };

            xhr.send();
        },

        handleSearch() {
            this.pagination.current = 1;
            this.loadBooks();
        },

        handlePageChange(page) {
            this.pagination.current = page;
            this.loadBooks();
        },

        handleSizeChange(size) {
            this.pagination.size = size;
            this.pagination.current = 1;
            this.loadBooks();
        },

        handleAdd() {
            this.dialogTitle = '添加图书';
            this.form = {
                id: null,
                bookName: '',
                bookNo: '',
                remarks: ''
            };
            this.dialogVisible = true;
        },

        handleEdit(row) {
            this.dialogTitle = '编辑图书';
            this.form = {
                id: row.id,
                bookName: row.bookName,
                bookNo: row.bookNo,
                remarks: row.remarks
            };
            this.dialogVisible = true;
        },

        handleDelete(row) {
            this.$confirm('确定要删除该图书吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.deleteBook(row.id);
            }).catch(() => {
                this.$message.info('已取消删除');
            });
        },

        deleteBook(id) {
            const that = this;
            const xhr = new XMLHttpRequest();
            xhr.open('DELETE', `${API_BASE_URL}/${id}`, true);
            xhr.setRequestHeader('Content-Type', 'application/json');

            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        const response = JSON.parse(xhr.responseText);
                        if (response.code === 200) {
                            that.$message.success('删除成功');
                            that.loadBooks();
                        } else {
                            that.$message.error(response.message || '删除失败');
                        }
                    } else {
                        that.$message.error('删除失败');
                    }
                }
            };

            xhr.send();
        },

        // 批量删除选中图书
        handleBatchDelete() {
            if (this.selectedBooks.length === 0) {
                this.$message.warning('请先选择要删除的图书');
                return;
            }
            this.$confirm(`确定要删除选中的 ${this.selectedBooks.length} 本图书吗？`, '批量删除提示', {
                confirmButtonText: '确定删除',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.batchDeleteBooks(this.selectedBooks);
            }).catch(() => {
                this.$message.info('已取消批量删除');
            });
        },

        batchDeleteBooks(ids) {
            const that = this;
            const xhr = new XMLHttpRequest();
            xhr.open('DELETE', `${API_BASE_URL}/batch`, true);
            xhr.setRequestHeader('Content-Type', 'application/json');

            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        const response = JSON.parse(xhr.responseText);
                        if (response.code === 200) {
                            that.$message.success(response.message || '批量删除成功');
                            that.selectedBooks = [];
                            that.loadBooks();
                        } else {
                            that.$message.error(response.message || '批量删除失败');
                        }
                    } else {
                        that.$message.error('批量删除失败');
                    }
                }
            };

            xhr.send(JSON.stringify(ids));
        },

        // 全选/取消全选
        handleSelectionChange(selection) {
            this.selectedBooks = selection.map(item => item.id);
        },

        submitForm() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    if (this.form.id) {
                        this.updateBook();
                    } else {
                        this.addBook();
                    }
                }
            });
        },

        addBook() {
            const that = this;
            const xhr = new XMLHttpRequest();
            xhr.open('POST', API_BASE_URL, true);
            xhr.setRequestHeader('Content-Type', 'application/json');

            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        const response = JSON.parse(xhr.responseText);
                        if (response.code === 200) {
                            that.$message.success('添加成功');
                            that.dialogVisible = false;
                            that.loadBooks();
                        } else {
                            that.$message.error(response.message || '添加失败');
                        }
                    } else {
                        that.$message.error('添加失败');
                    }
                }
            };

            xhr.send(JSON.stringify({
                bookName: this.form.bookName,
                bookNo: this.form.bookNo,
                remarks: this.form.remarks
            }));
        },

        updateBook() {
            const that = this;
            const xhr = new XMLHttpRequest();
            xhr.open('PUT', `${API_BASE_URL}/${this.form.id}`, true);
            xhr.setRequestHeader('Content-Type', 'application/json');

            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        const response = JSON.parse(xhr.responseText);
                        if (response.code === 200) {
                            that.$message.success('更新成功');
                            that.dialogVisible = false;
                            that.loadBooks();
                        } else {
                            that.$message.error(response.message || '更新失败');
                        }
                    } else {
                        that.$message.error('更新失败');
                    }
                }
            };

            xhr.send(JSON.stringify({
                bookName: this.form.bookName,
                bookNo: this.form.bookNo,
                remarks: this.form.remarks
            }));
        },

        resetForm() {
            this.$refs.form.resetFields();
        },

        formatDate(dateStr) {
            if (!dateStr) return '';
            const date = new Date(dateStr);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            const seconds = String(date.getSeconds()).padStart(2, '0');
            return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        }
    }
});
