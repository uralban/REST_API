$(function(){

    $(document).on('click', '.delete-category-button', function(){

        var product_id = $(this).attr('data-id');

        $.ajax({
	        url: "/api/category/delete.php",
	        type : "POST",
	        dataType : 'json',
	        data : JSON.stringify({ id: product_id }),
	        success : function(result) {

	            showCategories();
	        },
	        error: function(xhr, resp, text) {
	            console.log(xhr, resp, text);
	        }
	    });

    });
});