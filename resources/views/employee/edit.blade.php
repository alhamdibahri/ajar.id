<div class="modal fade" id="edit-item" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">x</span></button>
                <h4 class="modal-title" id="myModalLabel">Edit Item</h4>
            </div>

            <div class="modal-body">
                <div id="validation-errors">

                </div>
                <form method="PUT" action="/item-ajax/14" >
                    <input type="hidden" name="id" class="form-control" />
                    <div class="form-group">
                        <label class="control-label" for="name">Name:</label>
                        <input type="text" name="name" class="form-control" />
                    </div>
                    <div class="form-group">
                        <label class="control-label" for="email">E-mail:</label>
                        <input type="text" name="email" class="form-control"/>
                    </div>
                    <div class="form-group">
                        <label class="control-label" for="title">Address:</label>
                        <textarea name="address" class="form-control" data-error="Please enter details."></textarea>
                    </div>
                    <div class="form-group">
                        <label class="control-label" for="gender">Gender:</label>
                        <div class="form-check">
                            <label class="form-check-label">
                                <input class="form-check-input" type="radio" name="gender" id="exampleRadios1" value="L">
                                Male
                            </label>
                        </div>
                        <div class="form-check">
                            <label class="form-check-label">
                                <input class="form-check-input" type="radio" name="gender" id="exampleRadios2" value="P">
                                Female
                            </label>
                        </div>
                    </div>
                    <div class="form-group">
                        <button type="submit" class="btn btn-success crud-submit-edit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
