$(function(){

    $(document).on('click', '.delete-product-button', function(){

        var product_id = $(this).attr('data-id');

        $.ajax({
	        url: "/api/product/delete.php",
	        type : "POST",
	        dataType : 'json',
	        data : JSON.stringify({ id: product_id }),
	        success : function(result) {

	            showProducts();
	        },
	        error: function(xhr, resp, text) {
	            console.log(xhr, resp, text);
	        }
	    });

    });
});